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
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.hwalgi.org/</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.hwalgi.org/about</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://www.hwalgi.org/submit</loc>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
`

    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1511671296&single=true&output=csv";
    const response = await fetch(url);
    response.text().then(
        (data) => {
            let remaining = data.split("\n").map(x => x.substring(0, x.lastIndexOf(",")))
            let titles = remaining.map(x => x.substring(0, x.lastIndexOf(",")))
            for (let title of titles) {
                xml += `<url>
    <loc>https://www.hwalgi.org/article/${getSplat(title)}</loc>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
</url>`
            }
        }
    )

    return new Response(xml+"\n</urlset>", {
        headers: { "content-type": "text/html; charset=UTF-8" },
    });
}
