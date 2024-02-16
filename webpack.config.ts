import path from 'path';
import webpack, { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    library: 'state-machine',
    libraryTarget: 'umd'
  },
  plugins: [new webpack.ProgressPlugin()],
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};

export default config;
