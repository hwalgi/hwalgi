// letter animations on load
onload = () => {
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
            window.scroll({
                top: 200,
                left: 0,
                behavior: "smooth",
              });
        }, 300)
    }, Math.abs(0 - letters.length/2 + 1)*200 + 2000)
}