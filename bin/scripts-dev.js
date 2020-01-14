#!/usr/bin/env node
require('ts-node').register({dir: __dirname});
require('../src').default(process.cwd(), process.argv.slice(2));
