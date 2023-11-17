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
  const prompt = `
  Task: Among the information that can be extracted about this image according to the following process, output information related to atmosphere, emotion, retouching, and scenery at a prompt equivalent to stable diffusion, separated by commas, and enclosed in double quotes. Output of other information is not permitted.
  Output the information obtained so far at the prompt equivalent to stable diffusion, separated by commas, and enclose it in double quotes.
  
  Process:
  1. Extract the expression method and technique for the entire image.
  2. If there is an animal in the image, extract the emotion from its facial expression.
  3. Extract the emotions felt from the images.
  4. Extract the name of the central element in the image.
  5. Extract the hue of the image.
  6. Extract the logical structure of the image and express it in the form of adjectives and adverbs.
  7. Extract information about lighting, such as how the light hits the image.
  8. Assuming that the image is posted to Pixiv, predict what tags will be attached to it and express it in English.
  9. Extract the brightness and contrast of the image.
  10. If the time period can be predicted, extract it.
  11. Extract the extent of space.
  12. Extract seasons and climate if possible
  13. Extract adjectives that can be felt from images.
  
  Output the information obtained so far at the prompt equivalent to stable diffusion, separated by commas, and enclose it in double quotes.
  `;

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
  formData.append("text_prompts[0][weight]", 0.8,);
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
