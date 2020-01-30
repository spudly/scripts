#!/usr/bin/env node
const path = require('path');
require('ts-node').register({
  dir: path.resolve(__dirname, '..'),
  transpileOnly: true,
});
require('../src').default(process.cwd(), process.argv.slice(2));
