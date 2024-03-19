// webpack.config.js
import { ProvidePlugin } from 'webpack';
const path = require('path');

module.exports = {
    // other webpack configurations...
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify"),
        "fs": false
      }
    }
  };