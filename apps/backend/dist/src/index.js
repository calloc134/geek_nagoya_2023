"use strict";
const _graphqlyoga = require("graphql-yoga");
const _nodehttp = require("node:http");
const _schema = require("./schema");
// Create a Yoga instance with a GraphQL schema.
const yoga = (0, _graphqlyoga.createYoga)({
    schema: _schema.schema,
    cors: {
        origin: [
            "https://geek-nagoya-2023.pages.dev",
            "http://localhost:5173"
        ],
        credentials: true,
        methods: [
            "POST"
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    }
});
// Pass it into a server to hook into request handlers.
const server = (0, _nodehttp.createServer)(yoga);
server.listen(6173, ()=>{
    console.log("🚀 Server is running");
});
// SIGTERMを受け取ったら、プロセスを終了
process.on("SIGTERM", async ()=>{
    console.log("✅ SIGTERM signal received: closing HTTP server");
    await server.close();
    console.log("👋 Process terminated");
});
