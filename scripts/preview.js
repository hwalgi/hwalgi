function populateCont() {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1745903701&single=true&output=csv").then(x => x.text()).then(r => {
        slug = window.location.href.split("?")[window.location.href.split("?").length - 1]
        cont = r.split("\n").filter(x => x.startsWith(slug))[0].trim().split(",")
        tit = cont[1]
        document.getElementById("tit").innerHTML = "<span contenteditable=\"true\" id=\"reviewerTitle\">" +  tit.split("...").map(x => x.trim()).map(x => x.startsWith("\"") ? x.slice(1,) : x).map(x => x.endsWith("\"") ? x.slice(0, -1) : x).join("</span><br><small contenteditable=\"true\" id=\"reviewerSub\">") + "</small>"
        cont.splice(0, 2)
        html = sanitizeText(cont.join(",").trim().slice(1, -1))
        document.getElementById("cont").innerHTML = html
    })
}

populateCont()