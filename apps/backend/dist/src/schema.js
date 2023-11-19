"use strict";
Object.defineProperty(exports, "schema", {
    enumerable: true,
    get: function() {
        return schema;
    }
});
const _graphqlyoga = require("graphql-yoga");
const _loadfiles = require("@graphql-tools/load-files");
const _utilities = require("./utilities");
const query_resolvers = {
    hello: async (_parent, _args, _context, _info)=>{
        return {
            message: "Hello World!",
            url: "https://google.com"
        };
    }
};
const mutation_resolvers = {
    process_image: async (_parent, args, _context, _info)=>{
        const { camera_image: camera_image_maybe, original_image: original_image_maybe } = args;
        if (!camera_image_maybe) throw new Error("Missing camera image.");
        if (!original_image_maybe) throw new Error("Missing original image.");
        // 画像を読み込んで解説する
        const describe = await (0, _utilities.gpt4v)(camera_image_maybe);
        console.debug("[💭] プロンプト: ", describe);
        // 画像を変換する
        const result = await (0, _utilities.img2img)(describe || "perfect", original_image_maybe);
        console.debug("[🖼] 変換完了");
        // console.debug("[🖼] 変換結果: ", result);
        // s3にアップロードする
        const result_upload = await (0, _utilities.s3_upload)(result);
        console.debug(`https://pub-ff76be015fe2485bb8d12628f4d70b12.r2.dev/${result_upload.filename}`);
        return {
            url: `https://pub-ff76be015fe2485bb8d12628f4d70b12.r2.dev/${result_upload.filename}`
        };
    }
};
const schema = (0, _graphqlyoga.createSchema)({
    typeDefs: [
        (0, _loadfiles.loadFilesSync)("../../schema.graphql")
    ],
    resolvers: {
        Query: query_resolvers,
        Mutation: mutation_resolvers
    }
});
