# nrs

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A <ins>**n**</ins>pm <ins>**r**</ins>egistry <ins>**s**</ins>elector to easy switch npm registry, alternative to [`nrm`](https://github.com/Pana/nrm).

## Features

The internal registry list is hosted on [vercel](https://vercel.com/), so you can easily update your local registry list by `nrs update` command instead of install a new version, if the remote list has any change.

## Installation

```bash
pnpm add -g nrs
```

## Usage

```bash
# list all registries
nrs ls

# show the current registry
nrm current

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
  "taobao": "https://registry.npmmirror.com/"
}
```

## License

[MIT](LICENSE)
