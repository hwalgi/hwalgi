function getSplat(str) {
    let splat = str.replace(/[^a-zA-Z]/g, "_").toLowerCase();
    while (splat.includes("__")) {
        splat = splat.replaceAll("__", "_")
    }
    if (splat.startsWith("_")) {
        splat = splat.slice(1,)
    }
    if (splat.endsWith("_")) {
        splat = splat.slice(0, -1) 
    }
    return splat
}

export async function onRequest(context) {
  const { slug } = context.params;

  try {
    const resp = await fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1511671296&single=true&output=csv&random=${Date.now()}`);
    const data = await resp.text();
    const doiresp = await fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1370662873&single=true&output=csv&random=${Date.now()}`);
    const doidata = await doiresp.text();
    
    let authors = data.split("\n").map(x => x.substring(x.lastIndexOf(",") + 1))
    let remaining = data.split("\n").map(x => x.substring(0, x.lastIndexOf(",")))
    let titles = remaining.map(x => x.substring(0, x.lastIndexOf(",")))

    let num = titles.map(x => getSplat(x)).indexOf(slug);

    let tit = titles[num].replaceAll("\"", "").split("...").map(x => x.trim())

    // Generate HTML that includes the slug
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${tit[0].toLocaleLowerCase()} | Hwalgi</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Hwalgi is host to award-winning, unflinching, uncompromised opinions." />
        <link rel="stylesheet" type="text/css" href="/styles/style.css?v=1757469162" />
        <link rel="stylesheet" type="text/css" href="/styles/article.css?v=1757469162" />
        <link rel="icon" href="/assets/images/icon.png">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.hwalgi.org/" />
        <meta property="og:title" content="Hwalgi" />
        <meta property="og:description" content="Empowering student voices." />
        <meta property="og:image" content="https://www.hwalgi.org/assets/images/thumbnail.png" />
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.hwalgi.org/" />
        <meta property="twitter:title" content="Hwalgi" />
        <meta property="twitter:description" content="Empowering student voices." />
        <meta property="twitter:image" content="https://www.hwalgi.org/assets/images/thumbnail.png" />
      </head>
      <body>
        <div class="navbar">
          <a href="/" class="active">Feed</a>
          <a href="/about.html">About</a>
          <a href="/submit.html">Submit</a>
        </div>

        <div class="article">
          <div id="popup">
            <small>Hey there! My name is William, and I'm Hwalgi's main editor. We run Hwalgi <b>entirely for free, without invasive ads or monetization</b>. It's a project I've run in my free time, but it's also a project that's grown into more than a small effort. We receive <b>hundreds</b> of submissions, and right now we're selective not by choice, but because we can't provide editorial services to as many submissions as we'd like. If you've enjoyed reading on Hwalgi - or you want to support our initiative - please just take a moment to consider <a href="https://hcb.hackclub.com/donations/start/hwalgi">donating</a>.</small>
          </div>
          <sub id="doi">${doidata.split("\n")[num].trim()}</sub>
          <h1 id="tit">${tit.join("<br><small>(") + ")</small>"}</h1>
          <sub id="aut">${authors[num]}</sub>
          <p id="cont">contents (loading)...</p>

          <div class="comments">
            <h2>Comments</h2>
            <h3>Submit a comment</h3>
            <form class="form" action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdhxWf1FCiUJaDYZAx462VBsv_PGlkg8Q5olsStP7zzQI3mrA/formResponse" id="submissionForm">
              <input id="commentID" name="entry.1362159903" value="0" hidden>
              <label for="email">Email *</label>
              <input name="entry.1784137562" type="email" id="email" placeholder="email@address.com" required />
              <label for="name">Comment *</label>
              <input name="entry.227513125" type="text" id="name" placeholder="Enter your comment here" required/>
              <input type="submit" value="Post" />
            </form>
            <sub>There may be a delay between posting comments and the comment appearing.</sub>
            <h3>Posted Comments</h3>
            <div id="comments">
              Loading...
            </div>
          </div>
        </div>
        <script src="/scripts/splat.js?v=1757469162"></script>
        <script src="/scripts/comments.js?v=1757469162"></script>
        <script src="/scripts/read.js?v=1757469162"></script>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { "content-type": "text/html; charset=UTF-8" },
    });
  } catch (error) {
    const htmlResponse = await fetch("https://www.hwalgi.org/404.html");

    const htmlText = await htmlResponse.text();

    return new Response(htmlText, {
      status: 404,
      headers: { "content-type": "text/html; charset=UTF-8" },
    });
  }
}
