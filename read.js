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
            // parse spreadsheet contents
            let articles = data.split("\n").filter(x => (!x.startsWith(","))).splice(1).join("\n").split("(::)(::)").filter(y => y != "\r")
            
            // serve specific article
            if (window.location.href.includes("article")) {
                num = parseInt(window.location.href.split("?")[1])
                art = articles[num]
                let title = art.split(",\"")[0].split("...").map(x => x.trim()).join(" / ")
                let aut = art.split(",")[art.split(",").length - 3]
                let tag = art.split(",")[art.split(",").length - 2]
                let text = art.slice(art.split(",\"")[0].length + 2, art.length-tag.length-aut.length-3)
                document.getElementById("tit").innerText = title
                document.getElementById("aut").innerText = aut
                document.getElementById("cont").innerText = text
            } /* serve all articles */ else {
                let index = 0
                for (let art of articles) {
                    let title = art.split(",\"")[0]
                    let aut = art.split(",")[art.split(",").length - 3]
                    let tag = art.split(",")[art.split(",").length - 2]
                    let contents = `${title.split("...")[0].trim()}...
                                <sub>${title.split("...")[1].trim()}</sub>
                                <div class="author">
                                    ${aut}
                                </div>`
                    // place in tag category on home page
                    switch (tag) {
                        case "Featured":
                            document.getElementById("feat").href = `/article.html?${index}`
                            document.getElementById("feat").innerHTML = contents
                            break
                        case "Politics":
                            aa = document.createElement("a")
                            aa.href = `/article.html?${index}`
                            aa.className = "story"
                            aa.innerHTML = contents
                            document.getElementById("polit").parentNode.insertBefore(aa, document.getElementById("polit"))
                            break
                        case "Science":
                            aa = document.createElement("a")
                            aa.href = `/article.html?${index}`
                            aa.className = "story"
                            aa.innerHTML = contents
                            document.getElementById("sci").parentNode.insertBefore(aa, document.getElementById("sci"))
                            break     
                    }  
    
                    if (index >= articles.length - 2) {
                        document.getElementById(`new${index-articles.length+3}`).href = `/article.html?${index}`
                        document.getElementById(`new${index-articles.length+3}`).innerHTML = contents
                    }
    
                    index++
                }
                // remove loading placeholders
                document.getElementById("polit").remove()
                document.getElementById("sci").remove()
            }
        })
    } catch (error) {
      console.error(error.message);
    }
  }
  getData()