// @ts-nocheck

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handleRequest() {
  const registries = await Deno.readFile("./registries.json");
  return new Response(registries, {
    headers: {
      "content-type": "application/json",
    },
  });
}

serve(handleRequest);