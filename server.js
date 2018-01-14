require('dotenv').config();
const path = require("path");
const express = require("express");
const httpProxy = require("http-proxy");

const PORT = process.env.PORT || '9000';
const API = process.env.API || 'localhost';
const PUBLIC_DIR = path.join(__dirname, 'dist');

const app = express();
const proxy = httpProxy.createProxyServer();

// Serving the files on the dist folder
app.use(express.static(PUBLIC_DIR));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Send Webpack's generated index.html
app.get("/", function (req, res) {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.all('/api/v1/*', function(req, res) {
  proxy.web(req, res, {target: API});
});

// Start server
app.listen(PORT, function() {
  console.log("Express server listening on port: " + PORT);
});
