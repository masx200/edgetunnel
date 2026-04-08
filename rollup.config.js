import { defineConfig } from "rollup";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  input: "_worker.js",
  external: ["cloudflare:sockets"],
  output: {
    file: "混淆结果.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [
    terser({
      module: true,
      compress: {
        drop_console: false,
        drop_debugger: false,
        pure_funcs: [],
      },
      format: {
        comments: false,
      },
      mangle: {
        reserved: [
          // 保留必要的变量名，避免破坏 Cloudflare Workers API
          "fetch",
          "Request",
          "Response",
          "WebSocket",
          "connect",
          "env",
          "ctx",
        ],
      },
    }),
  ],
});
