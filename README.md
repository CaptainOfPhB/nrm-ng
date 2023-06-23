# nrm-ng

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

The NPM registry management, the next generation of [nrm](https://github.com/Pana/nrm).

## Why `nrm-ng`?

- **Registry is always up-to-date**. The internal registry list is hosted on [Deno Deploy](https://deno.com/deploy), so if there are any changes to the remote registry list, you can conveniently keep the local registry list up-to-date with the `nrm update` command instead of installing a new version.

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
