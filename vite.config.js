import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  server: {
    port: 3000,
    open: true, //自动打开
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      "/api": {
        target: "http://localhost:9091", // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, "")
      },
    },
  },
  alias: {
    "@": resolve(__dirname, "src"),
  },
};
