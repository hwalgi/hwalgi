function populateCont(area) {
    html = area.value
    html = sanitizeText(html)
    document.getElementById("cont").innerHTML = html


    updateArea()
}

function updateArea() {
    let area = document.querySelector("textarea")
    area.value = document.getElementById("cont").innerHTML
}