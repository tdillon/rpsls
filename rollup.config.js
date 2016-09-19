import typescript from 'rollup-plugin-typescript'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
    entry: './src/main.ts',
    format: 'iife',
    dest: 'bundle.js',
    plugins: [
        typescript(),
        nodeResolve({ jsnext: true })
    ]
}