const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');    // html 渲染
const ExtractPlugin = require('extract-text-webpack-plugin');  // 打包分离css

const isDev = process.env.NODE_ENV === 'development'; // 判断环境变量是否是开发模式

const config = {
	target: 'web',
	entry: path.join(__dirname,'src/index.js'),  // 输入
	output: {                                    // 输出
		filename: 'bundle.js',
		path: path.join(__dirname,'dist')  
	},
	module: {      // 加载模块
		rules: [   // 规则
			{
				test: /\.vue$/,        // 匹配类型
				loader: 'vue-loader'   // 解析
			},
			{
				test: /\.jsx$/,        // 处理jsx
				loader: 'babel-loader'
			},
			{
				test: /\.(jpg|png|jpeg|gif|svg)/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,            // 大小转义base64
							name: '[name].[ext]'    // 输出文件名和后缀名
						}	
					}
				]
				
			},

		]
	},
	plugins: [
		new webpack.DefinePlugin({ // 环境变量区分
			'process_env': {
				NODE_ENV: isDev? '"development"' : '"production"'  // 
			}
		}),
		new HTMLPlugin()
	]
}
if (isDev) {
	config.module.rules.push({
		test: /\.styl/,
		use: [
			'style-loader',
			'css-loader',
			{
				loader: 'postcss-loader',  // 提高编译效率
				options: {
					sourceMap: true        // 利用之前生成的 sourceMap
				}
			},
			'stylus-loader'                // 生成sourceMap
		]
	})
	config.devtool = '#cheap-module-eval-source-map'  // 映射map
	config.devServer = {
		port: 8000,     
		host: '0.0.0.0',
		overlay: {   // 编译出错
			error:true
		},
		hot: true
	}
	config.plugins.push(
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		)
} else {
	config.entry = {
		app: path.join(__dirname,'src/index.js'),
		vendor: ['vue']
	}
	config.output.filename = '[name].[chunkhash:8].js'
	config.module.rules.push(
		{
			test: /\.styl/,
			use: ExtractPlugin.extract({
				fallback: 'style-loader',
				use: [
					'css-loader',
					{
						loader: 'postcss-loader',  // 提高编译效率
						options: {
							sourceMap: true        // 利用之前生成的 sourceMap
						}
					},
					'stylus-loader'                // 生成sourceMap
				]
			})
		}
	)
	config.plugins.push(
		new ExtractPlugin('style.[contenthash:8].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor"
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "runtime"
		})

	)
}
module.exports = config