module.exports = {
  proxy: "localhost:3000",
  files: ["*.html", "*.css", "*.js"],
  ignore: ["node_modules", "server.js"],
  reloadDelay: 10,
  ui: false,
  notify: false,
  port: 3001,
};

