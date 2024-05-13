import * as path from "https://deno.land/std@0.224.0/path/mod.ts";
import { Eta } from "https://deno.land/x/eta@v3.0.3/src/index.ts";
import { parseArgs } from "jsr:@std/cli/parse-args";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

const viewpath = Deno.cwd() + "/src/public/";
const eta = new Eta({ views: viewpath, cache: true });

const flags = parseArgs(Deno.args, {
  string: ["port"],
  default: { port: "3000" },
});

async function handler(request: Request) {
  const url = new URL(request.url);
  let filepath = decodeURIComponent(url.pathname);
  if (filepath === "/") {
    filepath = "/index.eta";
  } else if (filepath.toLocaleLowerCase().indexOf(".") <= 0) {
    filepath = `${filepath}.eta`;
  }

  let file;
  let response;
  try {
    console.log(filepath);
    if (filepath.indexOf(".eta") > 0) {
      response = new Response(await eta.render(filepath, {}), {
        headers: { "content-type": "text/html" },
      });
    } else {
      file = await Deno.open(__dirname + "/public" + filepath, {
        read: true,
      });
      const readableStream = file.readable;
      response = new Response(readableStream);
    }
  } catch (e) {
    console.error(e);
    response = new Response("404 Not Found", { status: 404 });
  }

  return response;
}

Deno.serve({ port: parseInt(flags.port) }, handler);
