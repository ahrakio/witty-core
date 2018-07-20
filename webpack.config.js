const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');


// Clean configurations
const clean_paths = [
    'dist'
];

const clean_options = {
    watch: true
};

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        library: 'bundle',
        filename: 'dist/bundle.js',
        libraryTarget: 'umd',
        path: path.resolve(__dirname)
    },
    target: 'node',
    mode: 'none',
    plugins: [
        new CleanWebpackPlugin(clean_paths, clean_options),
        new UglifyJsPlugin()
    ]
};