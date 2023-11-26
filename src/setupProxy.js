const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/storage',
    createProxyMiddleware({
      target: 'https://frontend-case-api.sbdev.nl/',
      changeOrigin: true,
    })
  );
};
