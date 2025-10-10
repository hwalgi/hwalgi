fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=387143471&single=true&output=csv&random=${Date.now()}`).then(r => r.text()).then(p => {  
    allSubmittedIDs = p.split("\n").slice(839).map(x => x.trim())
    // slice to start with the first submission after online ui was implemented
    
    fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=58679177&single=true&output=csv&random=${Date.now()}`).then(r => r.text()).then(t => {
        allT = t.split("\n").map(x => x.split(","))
        allReviewedIDs = allT.map(x => x[0])

        fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1745903701&single=true&output=csv&random=${Date.now()}`).then(x => x.text()).then(r => {
            document.getElementById("loading").hidden = true
            for (id of allSubmittedIDs) {
                if (!allReviewedIDs.includes(id)) {
                    cont = r.split("(::)(::)").filter(x => x.startsWith(id))[0].trim().split(",")
                    tit = cont[1].split(" AUTHORBYNAME")[0]
                    a = document.createElement("a")
                    a.innerText = tit.split(" ...").join(" (").trim() + ")"
                    document.getElementById("listOfPending").appendChild(a)
                    a.href = `/reviewer.html?${id}`
                }
            }
        })
    })
})