import type { Configuration } from 'webpack';

import * as path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

import { rules } from './webpack.rules';
import { plugins as basePlugins } from './webpack.plugins';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    ...basePlugins,
    new CopyPlugin({
      patterns: [
        {

          from: path.resolve(process.cwd(), 'src/db/notes.json'),
          to: path.resolve(process.cwd(), '.webpack/main/db/notes.json'),
          noErrorOnMissing: false,

        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
