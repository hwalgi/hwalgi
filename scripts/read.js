async function getData() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=859842630&single=true&output=csv";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // get spreadsheet contents
        response.text().then(
            (data) => {
                console.log(data)
                // parse spreadsheet contents
                let articles = data.split("\n").filter(x => (!x.startsWith(","))).splice(1).join("\n").split("(::)(::)").filter(y => y != "\r")

                // serve specific article
                num = parseInt(window.location.href.split("?")[1])
                art = articles[num]
                let title = art.split(",\"")[0].split("...").map(x => x.trim()).map(x => x.startsWith("\"") ? x.slice(1,) : x).map(x => x.endsWith("\"") ? x.slice(0, -1) : x).join(" / ")
                let aut = art.split(",")[art.split(",").length - 3]
                let tag = art.split(",")[art.split(",").length - 2]
                let text = art.slice(art.split(",\"")[0].length + 2, art.length - tag.length - aut.length - 3).replaceAll("\"\"","\"")
                text = text.substring(0, text.lastIndexOf("\""))
                document.getElementById("tit").innerText = title
                document.getElementById("aut").innerText = aut
                document.getElementById("cont").innerText = text
            })
    } catch (error) {
        console.error(error.message);
    }
}
getData()