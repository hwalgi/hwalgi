ps = document.getElementsByClassName("content")[0].getElementsByTagName("p")
for (p of ps) {        
    p.style.opacity = 0.5
    p.style.color = "white"
}
onscroll = () => {
    y = window.scrollY
    for (p of ps) {
        t = p.getBoundingClientRect().top
        b = p.getBoundingClientRect().bottom

        // in focus text block
        if (t <= window.innerHeight/2 && b >= window.innerHeight/2) {
            p.style.opacity = 1
            upLim = Math.round((window.innerHeight/2 - t)/(b-t)*p.innerText.length)
            p.innerHTML = `<span style="opacity:1; color:var(--spec-orange);">${p.innerText.slice(0, upLim)}</span><span style="opacity:0.5; color:white;">${p.innerText.slice(upLim)}</span>`
        } /* below text block */ else if (t >= window.innerHeight/2) {
            p.innerHTML = p.innerText
            p.style.opacity = 0.5
            p.style.color = "white"
        } /* above text block */ else {
            p.innerHTML = p.innerText
            p.style.opacity = 1
            p.style.color = "var(--spec-orange)"
        }
    }
}