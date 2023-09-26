import path from 'path';
import { defineConfig } from 'vite';
import shebang from 'rollup-plugin-preserve-shebang';

export default defineConfig({
  build: {
    outDir: 'lib',
    target: 'es2015',
    lib: {
      formats: ['cjs'],
      entry: [
        'src/actions.js',
        'src/constants.js',
        'src/helpers.js',
        'src/index.js',
        'src/utils.js',
      ],
    },
  },
  plugins: [
    shebang({
      shebang: '#!/usr/bin/env node',
      entry: path.resolve(process.cwd(), 'src/index.js'),
    }),
  ],
});