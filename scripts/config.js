const babel = require('rollup-plugin-babel')
const fileSize = require('rollup-plugin-filesize')
const resolve = require('rollup-plugin-node-resolve')

const genOutPut = (banner, pkg) => {
  return [
    {
      file: pkg.main,
      format: 'umd',
      banner,
      name: 'pratique-plugin',
      export: 'default',
    },
  ]
}

const getConfigInfo = (pkg) => {
  const banner = `// ${pkg.name} 
    // version: ${pkg.version}
    // pratique-plugin
    //  (c) 2021-${new Date().getFullYear()} ${pkg.author}
    // ${pkg.name} may be freely distributed under the ISC license.
    `
  const SERVER_URL = {
    'SERVER-COVERAGE': '/coverage/lcov-report/index.html',
    'SERVER-DOCS': `/docs/${pkg.name}/${pkg.version}/index.html`,
  }

  const plugins = [
    babel({
      exclude: ['node_modules/**', 'test', 'coverage/', 'docs/'],
    }),
    fileSize(),
    resolve(),
  ]

  return {
    output: genOutPut(banner, pkg),
    SERVER_URL,
    plugins,
    external: [], // 外部依赖包
  }
}

module.exports = getConfigInfo
