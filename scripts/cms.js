
fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1511671296&single=true&output=csv&random=${Date.now()}`).then(r => r.text()).then(t => {
    let rows = t.split("\n").map(x => x.split(","))
    let authors = rows.map(x => x[x.length - 2].trim())
    let titles = rows.map(x => x.slice(0, x.length - 2).join(",").trim())
    let tags = rows.map(x => x[x.length - 1].trim())
    for (let i = 0; i < titles.length; i++) {
        a = document.createElement("a")
        tit = titles[i].split("...").map(x => x.trim()).map(x => x.startsWith("\"") ? x.slice(1,) : x).map(x => x.endsWith("\"") ? x.slice(0, -1) : x)
        splat = getSplat(tit.join("\n"))
        a.innerText = tit.join(" (").toUpperCase() + ")"
        document.getElementById("listOfPending").appendChild(a)
        a.href = `/edit.html?${splat}`
    }
    document.getElementById("loading").hidden = true
})