# nrm-ng

The NPM registry management, the next generation of [nrm](https://github.com/Pana/nrm).

## Why `nrm-ng`?

- **Fast and easy to use**. Fully compatible with `nrm`, you can easily and smoothly migrate to `nrm-ng`. 
- **More minimum package size**. `nrm-ng` removes a bunch of useless functions from `nrm` that were built into `npm`.
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
# init nrm-ng
nrm-ng init

# list registry
nrm-ng ls

# show the current registry
nrm-ng current

# add registry
nrm-ng add gh https://npm.pkg.github.com

# switch registry
nrm-ng use gh

# remove registry
nrm-ng rm gh

# ping registry response speed
nrm-ng ping

# keep the registry up-to-date
nrm-ng update
```

If you are using `nrm` and want to switch to `nrm-ng`, set up an alias in your `.bashrc` or `.zshrc` file.

```bash
alias nrm='nrm-ng'
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

## License

[MIT](LICENSE)
