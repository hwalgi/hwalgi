async function getData() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1511671296&single=true&output=csv";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // get spreadsheet contents
        response.text().then(
            (data) => {
                let authors = data.split("\n").map(x => x.substring(x.lastIndexOf(",") + 1))
                let remaining = data.split("\n").map(x => x.substring(0, x.lastIndexOf(",")))
                let titles = remaining.map(x => x.substring(0, x.lastIndexOf(",")))
                let tags = remaining.map(x => x.substring(x.lastIndexOf(",") + 1))
                titles = titles.map(x => x.trim()).map(x => x.startsWith("\"") ? x.slice(1,) : x).map(x => x.endsWith("\"") ? x.slice(0, -1) : x)

                let replaced = []
                let tagList = []
                for (let i = titles.length - 1; i >= 0; i--) {
                    try {
                        let title = titles[i]
                        let aut = authors[i]
                        let tag = tags[i]
                        let contents = `${title.split("...")[0].trim()}
                                    <sub>${title.split("...")[1].trim()}</sub>
                                    <div class="author">
                                        ${aut}
                                    </div>`
                        // place in tag category on home page
                        aa = document.createElement("a")
                        aa.href = `/article/${getSplat(title)}`
                        aa.className = "story " + tag + "TAG"
                        aa.innerHTML = contents
                        document.getElementById(tag + " Place").parentNode.insertBefore(aa, document.getElementById(tag + " Place"))
                        replaced.push(tag + " Place")
                        tagList.push(tag)


                        if (i >= titles.length - 2) {
                            document.getElementById(`new${i - titles.length + 3}`).href = `/article/${i}`
                            document.getElementById(`new${i - titles.length + 3}`).innerHTML = contents
                        }
                    } catch (error) {}
                }

                // remove loading placeholders
                replaced.filter((x, i) => replaced.indexOf(x) == i).map(x => document.getElementById(x).remove())

                let tagCont = document.getElementById("tags")
                for (tag of tagList.filter((x, i) => tagList.indexOf(x) == i)) {
                    tagCont.innerHTML += `<button class="tagSelected" onclick="deactivateTag('${tag}', this)">${tag}</button>`
                }
            })
    } catch (error) {
        console.error(error.message);
    }
}
getData()