import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { schema } from "./schema";

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema });

// Pass it into a server to hook into request handlers.
const server = createServer(yoga);

server.listen(6173, () => {
  console.log("🚀 Server is running");
});

// SIGTERMを受け取ったら、プロセスを終了
process.on("SIGTERM", async () => {
  console.log("✅ SIGTERM signal received: closing HTTP server");
  await server.close();

  console.log("👋 Process terminated");
});
