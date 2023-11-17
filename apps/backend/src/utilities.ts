import { v4 as uuidv4 } from "uuid";
// gpt4vを用いて画像を認識する
import OpenAI from "openai";
import { read, MIME_PNG } from "jimp";
import fetch from "node-fetch";
// @ts-expect-error form-dataの型定義がないので
import FormData from "form-data";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  openai_apiKey,
  dreamstudio_apiKey,
  s3_access_key_id,
  s3_secret_access_key,
} from "./env";

const openai = new OpenAI({
  apiKey: openai_apiKey,
});

const s3_client = new S3Client({
  region: "auto",
  endpoint: "https://e7137f652dd80db6ee88281769ed4e0f.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: s3_access_key_id,
    secretAccessKey: s3_secret_access_key,
  },
});

const gpt4v = async (image: File) => {
  const prompt = `この画像が示す抽象的な雰囲気や、感情、レタッチ、情景を解説して、stable diffusionに相当するプロンプトを英語で記述せよ。
  具体的な解説は一切行わず、抽象的な印象にとどめること。
  stable diffusionに相当するプロンプトのみを出力し、それ以外は一切出力を許さない。出力は、ダブルクォーテーションで囲んで行うこと。`;

  if (!openai_apiKey) throw new Error("Missing OpenAI API key.");
  // base64として読み込む

  console.log(image);
  const image_base64 = Buffer.from(await image.arrayBuffer()).toString(
    "base64"
  );

  try {
    const result = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      temperature: 0.2,
      max_tokens: 256,
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${image_base64}`,
              },
            },
          ],
        },
      ],
    });
    return result.choices[0].message.content;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const img2img = async (prompt: string, file: File) => {
  // ファイルの読み込み
  const fileArrayBuffer = await file.arrayBuffer();

  // 画像の読み込み
  const image_original = await read(Buffer.from(fileArrayBuffer));

  // 画像のリサイズ
  image_original.cover(1024, 1024);

  const engineId = "stable-diffusion-xl-1024-v1-0";
  const apiHost = "https://api.stability.ai";
  const apiKey = dreamstudio_apiKey;

  if (!apiKey) throw new Error("Missing Stability API key.");

  const formData = new FormData();
  formData.append("init_image", await image_original.getBufferAsync(MIME_PNG));
  formData.append("init_image_mode", "IMAGE_STRENGTH");
  formData.append("image_strength", 0.2);
  formData.append("text_prompts[0][text]", prompt);
  formData.append("cfg_scale", 9);
  formData.append("samples", 1);
  formData.append("steps", 30);

  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/image-to-image`,
    {
      method: "POST",
      headers: {
        ...formData.getHeaders(),
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  interface GenerationResponse {
    artifacts: Array<{
      base64: string;
      seed: number;
      finishReason: string;
    }>;
  }

  const responseJSON = (await response.json()) as GenerationResponse;

  return responseJSON.artifacts[0].base64;
};

const s3_upload = async (image_base64: string) => {
  // uuid v4を作成する
  const filename = `${uuidv4()}.png`;
  // アップロード
  await s3_client.send(
    new PutObjectCommand({
      Bucket: "geek-nagoya-2023",
      Key: filename,
      Body: Buffer.from(image_base64, "base64"),
    })
  );

  return {
    filename,
  };
};

export { gpt4v, img2img, s3_upload };
