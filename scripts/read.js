function getTitle(art) {
    return art.split(",\"")[0].split("...").map(x => x.trim()).map(x => x.startsWith("\"") ? x.slice(1,) : x).map(x => x.endsWith("\"") ? x.slice(0, -1) : x)
}

async function getData(spl) {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=859842630&single=true&output=csv";
    let aut, tag, text, title
    let num
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // get spreadsheet contents
        response.text().then(
            (data) => {
                // parse spreadsheet contents
                let articles = data.split("\n").filter(x => (!x.startsWith(","))).splice(1).join("\n").split("(::)(::)").filter(y => y != "\r")

                num = articles.map(x => getSplat(getTitle(x).join("\n"))).indexOf(spl)

                // serve specific article
                art = articles[num]
                title = getTitle(art).join("<br><small>(") + ")</small>"
                aut = art.split(",")[art.split(",").length - 3]
                tag = art.split(",")[art.split(",").length - 2]
                text = art.slice(art.split(",\"")[0].length + 2, art.length - tag.length - aut.length - 3).replaceAll("\"\"","\"")
                text = text.substring(0, text.lastIndexOf("\""))
                document.getElementById("tit").innerHTML = title
                document.title = title.split("<br>")[0].toLocaleLowerCase() + " | Hwalgi"
                document.getElementById("aut").innerText = aut
                document.getElementById("cont").innerText = text
            })
    } catch (error) {
        console.error(error.message);
    }

    const doiURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1370662873&single=true&output=csv"
    try {
        const response = await fetch(doiURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // get spreadsheet contents
        response.text().then(
            (data) => {
                let doi = data.split("\n")[num].trim()
                citeBtn = document.createElement("button")
                citeBtn.innerText = `Cite this article - ${doi}`
                citeBtn.className = "citeBtn"
                citeBtn.onclick = () => {
                    navigator.clipboard.writeText(`@article{hwalgi_${num},
    doi = {${doi}},
    url = {https://hwalgi.org/article/${num}},
    journal = {Hwalgi},
    author = {${aut}, },
    title = {${document.getElementById("tit").innerText.replace("\n", " ")}},
    publisher = {Hwalgi},
    year = {${new Date().getFullYear()}},
    copyright = {Other (Not Open)}
}`)
                    citeBtn.innerText = "Bibtex copied to clipboard!"
                    setTimeout(() => {
                        citeBtn.innerText = `Cite this article - ${doi}`
                    }, 1000)
                }
                document.getElementById("doi").innerHTML = ""
                document.getElementById("doi").appendChild(citeBtn) 
            })
    } catch (error) {
        console.error(error.message);
    }
}
if (window.location.href.includes("article")) {
    let splat
    if (window.location.href.includes("article/")) {
        let parts = window.location.href.split("/")
        splat = parts[parts.length - 1]
    } else {
        splat = window.location.href.split("?")[1]
    }
    loadComments()
    getData(splat)
}