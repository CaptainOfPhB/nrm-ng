export default {
  "src/**/!(*test).{ts,mts}": (filenames) => filenames.map((filename) => `pnpm run check ${filename}`),
}