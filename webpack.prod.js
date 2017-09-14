/**
 * Created by kolesnikov-a on 13/09/2017.
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin({
			API_ENDPOINT: JSON.stringify("http://10.1.0.61:8090"),
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new UglifyJSPlugin({
			sourceMap: true
		})
	]
});