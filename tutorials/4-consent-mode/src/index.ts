import { configure, renderFile } from "https://deno.land/x/eta@v1.11.0/mod.ts";
import { parse } from "https://deno.land/std@0.207.0/flags/mod.ts";

const __dirname = new URL(".", import.meta.url).pathname;

const viewPath = [
  `${__dirname}/public`,
  `${__dirname}/public/partials`,
  `${__dirname}/public/layouts`,
];

configure({ views: viewPath });

const flags = parse(Deno.args, {
  string: [ "port" ],
  default: { port: 80 },
});

const server = Deno.listen({ port: flags.port });
console.log("File server running on http://localhost:" + flags.port + "/");

for await (const conn of server) {
  handleHttp(conn).catch(console.error);
}

async function handleHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    let filepath = decodeURIComponent(url.pathname);
    if (filepath === "/") {
      filepath = "index.eta";
    } else if (filepath.toLocaleLowerCase().indexOf(".") <= 0) {
      filepath = `${filepath}.eta`;
    }

    let file;
    let response;
    try {
      console.log(filepath);
      if (filepath.indexOf(".eta") > 0) {
        response = new Response(await renderFile(filepath, {}), {
          headers: { "content-type": "text/html" },
        });
      } else {
        file = await Deno.open(__dirname + "public" + filepath, {
          read: true,
        });
        const readableStream = file.readable;
        response = new Response(readableStream);
      }
    } catch (e) {
      console.error(e);
      response = new Response("404 Not Found", { status: 404 });
      return;
    }

    await requestEvent.respondWith(response);
  }
}
