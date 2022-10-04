# nrs

<ins>**N**</ins>ode <ins>**R**</ins>egistry <ins>**S**</ins>elector, alternative to [`nrm`](https://github.com/Pana/nrm).

## Installation

```bash
# use npm
npm i -g nrs

# use yarn
yarn add -g nrs

# use pnpm
pnpm add -g nrs
```

## Usage

```bash
# list all registries
nrs ls

# switch to a registry
nrs use gh

# add a registry
nrs add gh https://npm.pkg.github.com

# remove a registry
nrs rm gh

# test a registry response speed
nrs test
```

## Supported registries

Referred to [`./registries.json`](./registries.json).

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
