// letter animations on load
window.addEventListener("load", () => {
    document.body.innerHTML += `
	<div id="banner">
		Please clear your cache if Hwalgi is not loading properly.
	</div>
    `
    setInterval(() => {
        y = window.scrollY
        if (y > 200) {
            document.getElementById("banner").style.top = "-500px"
        } else {
            document.getElementById("banner").style.top = ""
        }
    }, 300)
    document.getElementById("title").innerHTML = document.getElementById("title").innerText.split("").map((x, i) => `<p class="letter" style="
	translate: 0 1em;">${x}</p>`).join("")
    letters = document.getElementById("title").getElementsByClassName("letter")
    for (let ind = 0; ind < letters.length; ind++) {
        setTimeout(() => {
            letters[ind].style.translate = "0 -1em"
        }, Math.abs(ind-letters.length/2 + 1)*200)
    }
    setTimeout(() => {
        document.getElementById("sub").style.opacity = 1
        setTimeout(() => {
            if (window.scrollY == 0) {
                window.scroll({
                    top: 200,
                    left: 0,
                    behavior: "smooth",
                  });
            }
        }, 300)
    }, Math.abs(0 - letters.length/2 + 1)*200 + 2000)
})