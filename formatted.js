fetch("spark.txt").then(x=>x.text()).then(
    x => {
        trans = x.split(" ")
        for (i = 0; i < 500; i++){
            sp = document.createElement("div")
            sp.innerText = trans[Math.floor(Math.random()*trans.length)]
            sp.id = i + "BG"
            sp.className = "bgDiv"
            sp.style.rotate = `${Math.random()*20-10}deg`
            document.getElementById("bg").appendChild(sp)
        }
        setInterval(() => {
            document.getElementById(Math.floor(Math.random()*100)+"BG").innerText = trans[Math.floor(Math.random()*trans.length)]
        }, 10)
    }
)

