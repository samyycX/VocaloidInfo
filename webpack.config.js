const path = require('path');

module.exports = {
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { 
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },
    plugins: [

    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    }
}