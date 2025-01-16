import { defaultPlugins, defineConfig } from "@hey-api/openapi-ts";
import { createClient } from "@hey-api/client-fetch";

const client = createClient({
  baseUrl: "http://127.0.0.1:8000",
});

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "http://127.0.0.1:8000/openapi.json",
  output: {
    format: "prettier",
    lint: "eslint",
    path: "src/client",
  },
  plugins: [
    ...defaultPlugins,
    "@hey-api/schemas",
    {
      dates: true,
      name: "@hey-api/transformers",
    },
    {
      enums: "javascript",
      name: "@hey-api/typescript",
    },
    "@tanstack/react-query",
  ],
});
