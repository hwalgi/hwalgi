fetch("../assets/text/spark.txt").then(x=>x.text()).then(
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
            let thisElement = document.getElementById(Math.floor(Math.random()*500)+"BG")
            thisElement.style.opacity = 0.15
            thisElement.innerText = trans[Math.floor(Math.random()*trans.length)]
            setTimeout(() => {
                thisElement.style.opacity = ""
            }, 500)
        }, 10)
    }
)

