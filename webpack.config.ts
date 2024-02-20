import path from 'path';
import webpack, { Configuration } from 'webpack';

const DEFAULT_MODE = 'development';

export interface BuildEnv {
  mode: 'production' | 'development';
}

export default (env: BuildEnv) => {
  const mode = env.mode || DEFAULT_MODE;
  const isDev = mode === DEFAULT_MODE;

  const config: Configuration = {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
      library: 'state-machine-lib',
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
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom'
    },
    devtool: isDev ? 'inline-source-map' : undefined
  };

  return config;
};
