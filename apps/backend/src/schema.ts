import { createSchema } from "graphql-yoga";
import { loadFilesSync } from "@graphql-tools/load-files";
import {
  MutationResolvers,
  QueryResolvers,
} from "./lib/generated/resolver-types";
import { gpt4v, img2img, s3_upload } from "./utilities";

const query_resolvers: QueryResolvers = {
  hello: async (_parent, _args, _context, _info) => {
    return {
      message: "Hello World!",
      url: "https://google.com",
    };
  },
};

const mutation_resolvers: MutationResolvers = {
  process_image: async (_parent, args, _context, _info) => {
    const {
      camera_image: camera_image_maybe,
      original_image: original_image_maybe,
    } = args;

    if (!camera_image_maybe) throw new Error("Missing camera image.");
    if (!original_image_maybe) throw new Error("Missing original image.");

    // 画像を読み込んで解説する
    const describe = await gpt4v(camera_image_maybe);

    console.debug("[💭] プロンプト: ", describe);

    // 画像を変換する
    const result = await img2img(describe || "perfect", original_image_maybe);

    // s3にアップロードする
    const result_upload = await s3_upload(result);

    return {
      url: `https://pub-ff76be015fe2485bb8d12628f4d70b12.r2.dev/${result_upload.filename}`,
    };
  },
};

export const schema = createSchema({
  typeDefs: [loadFilesSync("../../schema.graphql")],
  resolvers: {
    Query: query_resolvers,
    Mutation: mutation_resolvers,
  },
});
