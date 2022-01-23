const { terser } = require('rollup-plugin-terser')
const cleanup = require('rollup-plugin-cleanup')
const serve = require('rollup-plugin-serve')
const pkg = require('./package.json')
const getConfigInfo = require('./scripts/config')

const { output, SERVER_URL, external, plugins } = getConfigInfo(pkg)

const config = {
  input: './scripts/entry.js',
  external,
  output,
  plugins,
  onwarn(warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return
    }
    console.error(warning.message)
  },
}

if (Object.keys(SERVER_URL).indexOf(process.env.custom) > -1) {
  config.plugins.push(
    serve({
      open: true,
      openPage: SERVER_URL[process.env.custom],
      host: 'localhost',
      port: 3000,
    })
  )
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(terser(), cleanup())
}

export default config
