import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import { uglify } from 'rollup-plugin-uglify'
import scss from 'rollup-plugin-scss'

const input = 'src/index.js'
const output = 'dist/index'

export default [
  {
    input: input,
    output: {
      file: `${output}.js`,
      format: 'cjs'
    },
    plugins: [
      resolve({
        browser: true
      }),
      commonjs({
        include: ['node_modules/**']
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      external(),
      uglify(),
      scss()
    ]
  },
  {
    input: input,
    output: {
      file: `${output}.modern.js`,
      format: 'es'
    },

    plugins: [
      resolve(),
      commonjs({
        include: ['node_modules/**']
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      external(),
      terser(),
      scss()
    ]
  },
  {
    input: input,
    output: {
      name: 'Library-New-Text',
      file: `${output}.umd.js`,
      globals: {
        react: 'React',
        'styled-components': 'styled',
        'prop-types': 'PropTypes',
        'prop-types/checkPropTypes': 'checkPropTypes'
      },
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs({
        include: ['node_modules/**']
      }),
      external(),
      babel({
        exclude: 'node_modules/**'
      }),
      terser(),
      scss()
    ]
  }
]
