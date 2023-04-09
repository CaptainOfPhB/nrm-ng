# nrs

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A <ins>**n**</ins>pm <ins>**r**</ins>egistry <ins>**s**</ins>elector to easy switch npm registry, alternative to [`nrm`](https://github.com/Pana/nrm).

## Installation

```bash
pnpm add -g nrs
```

## Usage

```bash
# list all registries
nrs ls

# add a registry
nrs add gh https://npm.pkg.github.com

# switch to a registry
nrs use gh

# remove a registry
nrs rm gh

# test a registry response speed
nrs test

# update the registry list to keep up with the latest
nrs update
```

## Supported registries

Refer to [`registries.json`](./registries.json).

```json
{
  "npm": "https://registry.npmjs.org/",
  "yarn": "https://registry.yarnpkg.com/",
  "tencent": "https://mirrors.cloud.tencent.com/npm/",
  "cnpm": "https://r.cnpmjs.org/",
  "taobao": "https://registry.npmmirror.com/",
  "npmMirror": "https://skimdb.npmjs.com/registry/"
}
```

## To-do

- [ ] Using serverless to host `registries.json` on vercel
- [ ] Using `nrm update` to sync the latest registry list
- [ ] Add badges to the `README.md`
- [ ] [travis-ci](https://travis-ci.org/)

## License

[MIT](LICENSE)
