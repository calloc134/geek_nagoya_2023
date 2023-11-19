"use strict";
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    gpt4v: function() {
        return gpt4v;
    },
    img2img: function() {
        return img2img;
    },
    s3_upload: function() {
        return s3_upload;
    }
});
const _uuid = require("uuid");
const _openai = require("openai");
const _jimp = require("jimp");
const _ofetch = require("ofetch");
const _formdatanode = require("formdata-node");
const _clients3 = require("@aws-sdk/client-s3");
const _env = require("./env");
const openai = new _openai.default({
    apiKey: _env.openai_apiKey
});
const s3_client = new _clients3.S3Client({
    region: "auto",
    endpoint: "https://e7137f652dd80db6ee88281769ed4e0f.r2.cloudflarestorage.com",
    credentials: {
        accessKeyId: _env.s3_access_key_id,
        secretAccessKey: _env.s3_secret_access_key
    }
});
const gpt4v = async (image)=>{
    const prompt = `
  タスク: この画像について，以下のプロセスに従って抽出できる情報のうち，雰囲気や感情，レタッチ，情景に関するものをstable diffusionに相当するプロンプトで,カンマ区切りで出力し，それをダブルクォーテーションで囲むこと。それ以外の情報の出力は許可しない．
  これまでに得られた情報をstable diffusionに相当するプロンプトで,カンマ区切りで出力すること．
  
  プロセス: 
  1. 画像の映っているものの名称を抽出する
  1. 画像の映っているものの名称を抽出する
  2. 画像全体の表現方法，技法を抽出する．
  3. 画像内に動物がいた場合，その表情から感情を抽出する．
  4. 画像から感じられる感情について抽出する．
  5. 画像のうち，中心となる要素の名称を抽出する．
  6. 画像の色合いを抽出する．
  7. 画像の論理構造を抽出し，形容詞，副詞の形で表現する．
  8. 画像内の光のあたり方などライティングに関する情報を抽出する．
  9. 画像がPixivに投稿されると仮定した場合，どのようなタグがつけられるかを予測し，英語で表す．
  10. 画像の明るさやコントラストを抽出する．
  11. 時間帯を予測できる場合，抽出する．
  12. 空間の広がりを抽出する．
  13. もし可能なら，季節や気候を抽出する
  14. 画像から感じられる形容詞を抽出する．
  
  これまでに得られた情報をstable diffusionに相当するプロンプトで,カンマ区切りで出力すること．
  `;
    if (!_env.openai_apiKey) throw new Error("Missing OpenAI API key.");
    // base64として読み込む
    console.log(image);
    const image_base64 = Buffer.from(await image.arrayBuffer()).toString("base64");
    try {
        const result = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            temperature: 0.2,
            max_tokens: 256,
            messages: [
                {
                    role: "system",
                    content: prompt
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/png;base64,${image_base64}`
                            }
                        }
                    ]
                }
            ]
        });
        return result.choices[0].message.content;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
const img2img = async (prompt, file)=>{
    // ファイルの読み込み
    const fileArrayBuffer = await file.arrayBuffer();
    // 画像の読み込み
    const image_original = await (0, _jimp.read)(Buffer.from(fileArrayBuffer));
    // 画像のリサイズ
    image_original.cover(1024, 1024);
    const engineId = "stable-diffusion-xl-1024-v1-0";
    const apiHost = "https://api.stability.ai";
    const apiKey = _env.dreamstudio_apiKey;
    if (!apiKey) throw new Error("Missing Stability API key.");
    const formData = new _formdatanode.default();
    formData.append("init_image", await image_original.getBufferAsync(_jimp.MIME_PNG));
    formData.append("init_image_mode", "IMAGE_STRENGTH");
    formData.append("image_strength", 0.2);
    formData.append("text_prompts[0][text]", prompt);
    formData.append("text_prompts[0][weight]", 0.7);
    formData.append("cfg_scale", 9);
    formData.append("samples", 1);
    formData.append("steps", 30);
    const response = await (0, _ofetch.ofetch)(`${apiHost}/v1/generation/${engineId}/image-to-image`, {
        method: "POST",
        headers: {
            ...formData.getHeaders(),
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: formData
    });
    if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`);
    }
    const responseJSON = await response.json();
    return responseJSON.artifacts[0].base64;
};
const s3_upload = async (image_base64)=>{
    // uuid v4を作成する
    const filename = `${(0, _uuid.v4)()}.png`;
    // アップロード
    await s3_client.send(new _clients3.PutObjectCommand({
        Bucket: "geek-nagoya-2023",
        Key: filename,
        Body: Buffer.from(image_base64, "base64")
    }));
    return {
        filename
    };
};
