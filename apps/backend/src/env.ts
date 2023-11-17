require("dotenv").config();

const openai_apiKey = process.env.OPENAI_API_KEY || "";
const dreamstudio_apiKey = process.env.DREAMSTUDIO_API_KEY || "";
const s3_access_key_id = process.env.S3_ACCESS_KEY || "";
const s3_secret_access_key = process.env.S3_SECRET_KEY || "";

// console.debug("openai_apiKey", openai_apiKey);
// console.debug("dreamstudio_apiKey", dreamstudio_apiKey);
// console.debug("s3_access_key_id", s3_access_key_id);
// console.debug("s3_secret_access_key", s3_secret_access_key);

export {
  openai_apiKey,
  dreamstudio_apiKey,
  s3_access_key_id,
  s3_secret_access_key,
};
