const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');//每次运行npx webpack时清除dist目录
var HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');//css单独打包

module.exports = {
  entry: {//js,多入口形式
    index: './src/js/index/indexEntry.js',
    song: './src/js/song/play-song.js',
    admin: './src/js/admin/adminEntry.js',
    songSheetAdmin: './src/js/songSheetAdmin/songSheetAdminEntry.js',
    songSheet: './src/js/songSheet/songSheetEntry.js',
  },
  devtool: 'inline-source-map',//报错定位到src中的源文件，而不是打包后的文件
  output: {
    filename: 'js/[name]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  //插件
  plugins:[
    new CleanWebpackPlugin(['dist']
    ),
    new ExtractTextPlugin('css/[name].css'),
    // 打包成的js，css文件会被插入到html的模板中，故不需要再html页面中引入
    new HtmlWebpackPlugin({
        chunks: ["index"], //html对应的输出的js文件
        filename:'index.html', //html输出到的目标路径
        template:'./src/index.html',//对应的源文件
        //这个东西非常重要，不加入这个，html-loader不能正确加载img路径
        inject: true,
        favicon: "./favicon.ico"
    }),
    new HtmlWebpackPlugin({
      chunks: ["song"], //html对应的输出的js文件
      filename:'song.html', //html输出到的目标路径
      template:'./src/song.html',
      inject: true,
      favicon: "./favicon.ico"
    }),
    new HtmlWebpackPlugin({
      chunks: ["admin"], //html对应的输出的js文件
      filename:'admin.html', //html输出到的目标路径
      template:'./src/admin.html',
      inject: true,
      favicon: "./favicon.ico"
    }),
    new HtmlWebpackPlugin({
      chunks: ["songSheetAdmin"], //html对应的输出的js文件
      filename:'songSheetAdmin.html', //html输出到的目标路径
      template:'./src/songSheetAdmin.html',
      inject: true,
      favicon: "./favicon.ico"
    }),
    new HtmlWebpackPlugin({
      chunks: ["songSheet"], //html对应的输出的js文件
      filename:'songSheet.html', //html输出到的目标路径
      template:'./src/songSheet.html',
      inject: true,
      favicon: "./favicon.ico"
    })
  ],
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../',//控制css中打包的img路径
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } }, // translates CSS into CommonJS
            'postcss-loader',
            "sass-loader" // compiles Sass to CSS]
          ]
        })
      },
      //处理图片
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name]-[hash:5].[ext]'//图片打包存放路径
            },
          }
        ]
      },
      //打包html中的img（src为本地图片），因为html没被入口js加载
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      }
    ]
  }
};