
id = window.location.href.split("?")[1]
intervalID = setInterval(() => {
    fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1725594247&single=true&output=csv&random=${Date.now()}`).then(r => r.text()).then(t => {
        if (t.includes(id)) {
            document.getElementById("title").innerText = "Success!"
            document.getElementById("sub").innerText = "Your submission has been received. We'll be in touch soon!"
            clearInterval(intervalID)
            document.getElementById("conf").style.scale = 1
        } else {
            submissionTime = parseInt(id.split("-")[0])
            currentTime = Date.now()
            delta = currentTime - submissionTime
            if (delta/(1000*60) < 6) {
                document.getElementById("title").innerText = "Pending..."
                document.getElementById("sub").innerText = "Come back in 5-10 minutes. You don't need to keep this page open, but keep it bookmarked so you can check if your submission goes through."
            } else {
                document.getElementById("title").innerText = "Oh no!"
                document.getElementById("sub").innerText = "Your submission didn't go through. We might be having issues with our form - email us your writing at <a href=\"mailto:contact@hwalgi.org\">contact@hwalgi.org</a>."
            }
            
        }
    })
}, 5000)