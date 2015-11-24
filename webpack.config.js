module.exports = {
  // webpack実行の起点
  entry: {
    bundle:'./client/assets/js'
  },
  // 出力先
  output: {
    filename: 'index.js'
  },
  // 開発用ツール
  devtool: 'inline-source-map', // ソースマップの表示
  module: {
    // testの条件を満たしていたらloaderで変換
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.jsx$/,
      loader: 'jsx-loader?harmony'
    }]
  },
  // module対象のファイルを指定
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  }
};
