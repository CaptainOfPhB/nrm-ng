declare interface Registry {
  [key: string]: {
    home: string;
    registry: string; // for compat with nrm config, use `registry` instead of `url`
  }
}