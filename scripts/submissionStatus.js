showCertif = () => {
    document.getElementById("certificate").classList.remove("hiddenCertif")
}
hideCertif = () => {
    document.getElementById("certificate").classList.add("hiddenCertif")
}

id = window.location.href.split("?")[1].trim()
intervalID = setInterval(() => {
    fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=58679177&single=true&output=csv&random=${Date.now()}`).then(r => r.text()).then(t => {
        allT = t.split("\n").map(x => x.split(","))
        allIDs = allT.map(x => x[0])
        allStatus = allT.map(x => x[1].trim())
        // if it has been reviewed
        if (allIDs.includes(id)) {
            clearInterval(intervalID)
            fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1511671296&single=true&output=csv&random=${Date.now()}`).then(r => r.text()).then(d => {
                rows = d.split("\n")
                splats = rows.map(x => getSplat(x.split(",")[0].trim()))
                authors = rows.map(x => x.split(",")[1].trim())

                // if it has been approved and published
                if (allStatus[allIDs.indexOf(id)] == "TRUE") {
                    ind = allIDs.filter((x, i) => allStatus[i] == "TRUE").indexOf(id)
                    document.getElementById("title").innerText = "Congrats!"
                    document.getElementById("sub").innerHTML = `Your submission has been accepted and published. You can view it live at <a href="https://www.hwalgi.org/article/${splats[ind]}">here</a>.`

                    document.getElementById("conf").style.scale = 1
                    fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1228636917&single=true&output=csv&random=${Date.now()}`).then(r => r.text()).then(p => {
                        rows = p.split("\n").map(x => x.replaceAll(",", "").trim()).filter(x => x.length > 0)
                        ids = rows.map(x => x.split("*")[0].trim())
                        hours = rows.map(x => parseFloat(x.split("*")[1].trim()))

                        if (hours[ids.indexOf(id)] == 0 || hours[ids.indexOf(id)] == undefined) {
                            document.getElementById("certifBTN").disabled = true
                            document.getElementById("certifBTN").innerText = "certificate isn't ready yet"
                        }

                        document.getElementById("name").innerText = authors[ind]
                        document.getElementById("hours").innerText = `${Math.min(hours[ids.indexOf(id)], 15)} hours`
                        document.getElementById("certifBTN").hidden = false
                    })
                } else if (allStatus[allIDs.indexOf(id)] == "FALSE") {
                    fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1228636917&single=true&output=csv&random=${Date.now()}`).then(r => r.text()).then(p => {
                        rows = p.split("\n").map(x => x.replaceAll(",", "").trim()).filter(x => x.length > 0)
                        ids = rows.map(x => x.split("*")[0].trim())
                        auts = rows.map(x => x.split("*")[2].trim())
                        hours = rows.map(x => parseFloat(x.split("*")[1].trim()))
                        if (ids.includes(id)) {
                            document.getElementById("title").innerText = "Rejected"
                            document.getElementById("sub").innerText = "Thank you for your submission. At this time, Hwalgi is not ready to provide publication to your piece. We encourage you to submit again in the future. We have awarded half of your claimed hours to acknowledge your time and consideration."

                            if (hours[ids.indexOf(id)] == 0 || hours[ids.indexOf(id)] == undefined) {
                                document.getElementById("certifBTN").disabled = true
                                document.getElementById("certifBTN").innerText = "certificate isn't ready yet"
                            }

                            document.getElementById("name").innerText = auts[ids.indexOf(id)]
                            document.getElementById("hours").innerText = `${Math.min(hours[ids.indexOf(id)], 8)} hours`
                            document.getElementById("certifBTN").hidden = false
                        }
                    })
                } else {
                    document.getElementById("title").innerText = "Flagged"
                    document.getElementById("sub").innerText = `Your submission has been flagged as a duplicate or invalid submission. If you believe this is incorrect, please email us at contact@hwalgi.org with the submission ID: ${id}`

                    if (hours[ids.indexOf(id)] == 0 || hours[ids.indexOf(id)] == undefined) {
                        document.getElementById("certifBTN").disabled = true
                        document.getElementById("certifBTN").innerText = "certificate isn't ready yet"
                    }

                    document.getElementById("name").innerText = auts[ids.indexOf(id)]
                    document.getElementById("hours").innerText = `${hours[ids.indexOf(id)]} hours`
                    document.getElementById("certifBTN").hidden = false
                }
            })
        } else {
            fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=387143471&single=true&output=csv&random=${Date.now()}`).then(r => r.text()).then(
                p => {
                    if (p.includes(id)) {
                        document.getElementById("title").innerText = "Submitted"
                        document.getElementById("sub").innerText = "Your submission is currently under review. You can check this page to see if your submission has been accepted or rejected. The review process usually takes up to a week, but can be extended in times of high submission volume."
                    } else {
                        submissionTime = parseInt(id.split("-")[0])
                        currentTime = Date.now()
                        delta = currentTime - submissionTime
                        console.log(delta / (1000 * 60))
                        if (delta / (1000 * 60) < 6) {
                            document.getElementById("title").innerText = "Pending..."
                            document.getElementById("sub").innerText = "Come back in 5-10 minutes. You don't need to keep this page open, but keep it bookmarked so you can check if your submission goes through."
                        } else {
                            document.getElementById("title").innerText = "Oh no!"
                            document.getElementById("sub").innerHTML = "Your submission didn't go through. We might be having issues with our form - email us your writing at <a href=\"mailto:contact@hwalgi.org\">contact@hwalgi.org</a>."
                        }
                    }
                }
            )

        }
    })
}, 1000)