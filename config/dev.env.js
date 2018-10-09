'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  api:'"http://www.baidu.com/"',
  test:'"http://api.apiopen.top/recommendPoetry"'
})
