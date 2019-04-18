const chai = require('chai')
global.expect = chai.expect
const path = require('path')
const babel = require('babel-core');

const babelResult = babel.transformFileSync(
  path.resolve(__dirname, '..', 'index.js'), {
    presets: ['env']
  }
);

const src = babelResult.code
