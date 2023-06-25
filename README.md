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
# list registry
nrm ls

# show the current registry
nrm current

# add registry
nrm add gh https://npm.pkg.github.com

# switch registry
nrm use gh

# remove registry
nrm rm gh

# ping registry response speed
nrm ping

# keep the registry up-to-date
nrm update
```

## Supported registry

Refer to [`registry.json`](./registry.json).

```json
{
  "npm": {
    "home": "https://www.npmjs.org",
    "registry": "https://registry.npmjs.org/"
  },
  "yarn": {
    "home": "https://yarnpkg.com",
    "registry": "https://registry.yarnpkg.com/"
  },
  "tencent": {
    "home": "https://mirrors.cloud.tencent.com/npm/",
    "registry": "https://mirrors.cloud.tencent.com/npm/"
  },
  "cnpm": {
    "home": "https://cnpmjs.org",
    "registry": "https://r.cnpmjs.org/"
  },
  "taobao": {
    "home": "https://npmmirror.com",
    "registry": "https://registry.npmmirror.com/"
  },
  "npmMirror": {
    "home": "https://skimdb.npmjs.com/",
    "registry": "https://skimdb.npmjs.com/registry/"
  }
}
```

<!-- 

TODO

- Compatible with `nrm`
- Add `nrm migrate` command for `nrm` user
- Loading when ping registry

-->

## License

[MIT](LICENSE)
