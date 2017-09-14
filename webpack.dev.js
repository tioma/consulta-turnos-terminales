/**
 * Created by kolesnikov-a on 13/09/2017.
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './build'
	},
	plugins: [
		new webpack.DefinePlugin({
			//API_ENDPOINT: JSON.stringify("http://10.10.0.223:8090")
			API_ENDPOINT: JSON.stringify("http://10.1.0.61:8090")
		})
	]
});