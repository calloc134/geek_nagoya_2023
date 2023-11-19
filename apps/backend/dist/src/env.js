"use strict";
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    dreamstudio_apiKey: function() {
        return dreamstudio_apiKey;
    },
    openai_apiKey: function() {
        return openai_apiKey;
    },
    s3_access_key_id: function() {
        return s3_access_key_id;
    },
    s3_secret_access_key: function() {
        return s3_secret_access_key;
    }
});
require("dotenv").config();
const openai_apiKey = process.env.OPENAI_API_KEY || "";
const dreamstudio_apiKey = process.env.DREAMSTUDIO_API_KEY || "";
const s3_access_key_id = process.env.S3_ACCESS_KEY || "";
const s3_secret_access_key = process.env.S3_SECRET_KEY || "";
