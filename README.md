# Google Analytics Tutorial Series

This repository contains the code used in the demo website for the
[Google Analytics Tutorial Series](https://www.youtube.com/watch?v=oJx9DpXtmAE&list=PLI5YfMzCfRtZ4bHJJDl_IJejxMwZFiBwz)
on YouTube. You can find the code for each video in the [/tutorials](/tutorials)
directory.

The current code is found in the [/src](/src) directory, which contains all the
changes made in each video up to the most recent video.

## Run the current version of the website

You must install [Deno](https://deno.land) to run the website code.

Once you install Deno, run the local web server with the following command:

```
deno task start
```

Then, open <http://localhost> in your web browser.

By default, the server listens on port 80. If that port is in use or is
otherwise unavailable, override the port using the `--port` argument.  For
example, you could run the server on port 8000 as follows:

```
deno task start --port 8000
```

Then, open <http://localhost:8000> in your web browser.

# Join our community

💬 [Join](https://discord.gg/65mah7ZZsG) the official GA Discord server\
📝 [Sign up](https://groups.google.com/g/google-analytics-developer-newsletter)
for the Google Analytics Developer Newsletter\
📄 [Explore](https://developers.google.com/analytics/) GA developer
documentation
