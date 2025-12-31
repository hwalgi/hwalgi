function populateCont() {
    fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1745903701&single=true&output=csv&random=${Date.now()}`).then(x => x.text()).then(r => {
        slug = window.location.href.split("?")[window.location.href.split("?").length - 1]

        fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=58679177&single=true&output=csv&random=${Date.now()}`).then(r => r.text()).then(t => {
            allT = t.split("\n").map(x => x.split(","))
            allReviewedIDs = allT.map(x => x[0])

            if (allReviewedIDs.includes(slug)) {
                alert("This has already been reviewed.")
                window.location.href = "/pending.html"
            } else {
                cont = r.split("(::)(::)").filter(x => x.startsWith(slug))[0].trim().split(",")
                console.log(cont)
                tit = cont[1].split(" AUTHORBYNAME")[0]
                authorName = cont[1].split(" AUTHORBYNAME")[1]
                document.getElementById("tit").innerHTML = "<span contenteditable=\"true\" id=\"reviewerTitle\">" + tit.split("...").map(x => x.trim()).map(x => x.startsWith("\"") ? x.slice(1,) : x).map(x => x.endsWith("\"") ? x.slice(0, -1) : x).join("</span><br><small contenteditable=\"true\" id=\"reviewerSub\">") + "</small>"
                cont.splice(0, 2)
                html = sanitizeText(cont.join(",").trim().slice(1, -1))
                document.getElementById("cont").innerHTML = html
            }
        })
    })
}

populateCont()