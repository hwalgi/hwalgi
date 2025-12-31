var spl = window.location.href.split("?")[1]
fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=859842630&single=true&output=csv&random=${Date.now()}`).then(r => r.text()).then(data => {
    let articles = data.split("\n").filter(x => (!x.startsWith(","))).splice(1).join("\n").split("(::)(::)").filter(y => y != "\r")

    num = articles.map(x => getSplat(getTitle(x).join("\n"))).lastIndexOf(spl)

    console.log(window.location.href.split("?")[1])

    // serve specific article
    art = articles[num]
    title = getTitle(art)
    authorName = art.split(",")[art.split(",").length - 3]
    tag = art.split(",")[art.split(",").length - 2]

    document.getElementById("tag").value = tag

    text = art.slice(art.split(",\"")[0].length + 2, art.length - tag.length - authorName.length - 3).replaceAll("\"\"", "\"")
    text = text.substring(0, text.lastIndexOf("\""))
    document.getElementById("tit").innerHTML = "<span id=\"reviewerTitle\">" + title.join("</span><br><small id=\"reviewerSub\">") + "</small>"

    document.getElementById("aut").innerText = authorName
    if (num < 21) {
        // legacy non-rich text
        document.getElementById("cont").innerText = text
    } else {
        document.getElementById("cont").innerHTML = sanitizeText(text)
    }
})