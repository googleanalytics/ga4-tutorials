import { parse } from "https://deno.land/std@0.207.0/flags/mod.ts";

const flags = parse(Deno.args, {
  string: [ "port" ],
  default: { port: 80 },
});

const server = Deno.listen({ port: flags.port });
console.log("File server running on http://localhost:" + flags.port + "/");

const __dirname = new URL(".", import.meta.url).pathname;

for await (const conn of server) {
    handleHttp(conn).catch(console.error);
}

async function handleHttp(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn);
    for await (const requestEvent of httpConn) {

        const url = new URL(requestEvent.request.url);
        const filepath = decodeURIComponent(url.pathname);

        let file;
        try {
            console.log(filepath);
            file = await Deno.open(__dirname + "/public" + filepath, { read: true });
        } catch {
            const notFoundResponse = new Response("404 Not Found", { status: 404 });
            await requestEvent.respondWith(notFoundResponse);
            return;
        }

        const readableStream = file.readable;
        const response = new Response(readableStream);
        await requestEvent.respondWith(response);
    }
}
