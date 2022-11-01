import fetch from 'node-fetch'

fetch("https://nrs-get-latest-registries.deno.dev/")
  .then(res => res.json())
  .then(json => console.log(json));
