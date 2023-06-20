# nrm-ng

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

The NPM registry management, the next generation of [nrm](https://github.com/Pana/nrm).

## Why `nrm-ng`?

- **Hot reload supported**. The internal registry list is hosted on [vercel](https://vercel.com/), so you can easily update your local registry list by `nrm update` command instead of install a new version if the remote registry list has changes.

## Installation

```bash
# npm
npm i -g nrm-ng
# yarn
yarn global add nrm-ng
# pnpm
pnpm add -g nrm-ng
```

## Usage

```bash
# list all registries
nrm ls

# show the current registry
nrm current

# add a registry
nrm add gh https://npm.pkg.github.com

# switch registry
nrm use gh

# remove registry
nrm rm gh

# ping registry response speed
nrm ping

# update the registry list to keep up with the remote
nrm update
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

## Todo

- Loading when ping registry

## License

[MIT](LICENSE)
