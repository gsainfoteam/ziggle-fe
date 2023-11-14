// import { createProxyMiddleware } from 'http-proxy-middleware';
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function expressMiddleware(router) {
  router.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3000/",
      changeOrigin: true,
    })
  );
};
