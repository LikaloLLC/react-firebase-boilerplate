import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
import serve from 'rollup-plugin-serve'
import reload from 'rollup-plugin-livereload'

import pkg from './package.json'

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'iife',
            sourcemap: true,
            globals: {
                "firebase": "firebase"
            }
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true
        }
    ],
    plugins: [
        postcss({
            plugins: [],
            minimize: true,
            sourceMap: 'inline',
        }),
        // external({
        //   includeDependencies: true,
        // }),
        url(),
        svgr(),
        resolve(),
        babel({
            plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties',
                'transform-react-remove-prop-types',
            ],
            exclude: 'node_modules/**',
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement','isValidElementType'],
                'node_modules/react-is/index.js': ['isValidElementType'],
            }
        }),
        // terser(),
        serve(),
        reload()
    ],
}
