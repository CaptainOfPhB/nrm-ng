import { defineConfig } from 'vite'

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
  }
})