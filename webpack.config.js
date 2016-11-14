const path = require('path');


module.exports = {
    entry: './src/index.js',
    output: {
	path: path.resolve(__dirname, 'dist'),
	publicPath: '/dist',
	filename: '[name].bundle.js'
    },
    module: {
	loaders: [{
            test: /\.(js|jsx)$/,
            include: [path.resolve(__dirname, 'src')],
            loader: 'babel',
            query: {
                cacheDirectory: path.resolve(__dirname, 'dist-cache'),
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
        }]
    },
    resolve: {
	extensions: ['', '.js', '.jsx'],
	root: [
	    path.resolve(__dirname, 'src')
	]
    },
    devtool: 'source-map'
}
