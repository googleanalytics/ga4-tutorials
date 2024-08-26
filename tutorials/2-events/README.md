# GA Tutorial Series - Events

This folder contains the code used in
the[Measure user activity with recommended events video](https://www.youtube.com/watch?v=PEPb3uaVILk)
on YouTube

## How to Run this Version

The local server requires [Deno](https://deno.land)

Once Deno is installed, you can run the local web server with the following
command from this folder [/tutorials/2-events](/tutorials/2-events):

```
deno run --allow-net --allow-read ./src/index.ts
```

Then, open <http://localhost> in your web browser.

By default, the server listens on port 80. If that port is in use or is
otherwise unavailable, override the port using the `--port` argument.  For
example, you could run the server on port 8000 as follows:

```
deno run --allow-net --allow-read ./src/index.ts --port 8000
```

Then, open <http://localhost:8000> in your web browser.

# Join Our Community

💬 [Join](https://discord.gg/65mah7ZZsG) the official GA Discord server\
📝 [Signup](https://groups.google.com/g/google-analytics-developer-newsletter)
for the Google Analytics Developer Newsletter\
📄 [Explore](https://developers.google.com/analytics/) GA developer
documentation
