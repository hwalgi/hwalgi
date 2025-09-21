var authorName = ""
function populateCont() {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=1745903701&single=true&output=csv").then(x => x.text()).then(r => {
        slug = window.location.href.split("?")[window.location.href.split("?").length - 1]
        cont = r.split("\n").filter(x => x.startsWith(slug))[0].trim().split(",")
        tit = cont[1].split(" AUTHORBYNAME")[0]
        authorName = cont[1].split(" AUTHORBYNAME")[1]
        document.getElementById("tit").innerHTML = "<span contenteditable=\"true\" id=\"reviewerTitle\">" +  tit.split("...").map(x => x.trim()).map(x => x.startsWith("\"") ? x.slice(1,) : x).map(x => x.endsWith("\"") ? x.slice(0, -1) : x).join("</span><br><small contenteditable=\"true\" id=\"reviewerSub\">") + "</small>"
        cont.splice(0, 2)
        html = sanitizeText(cont.join(",").trim().slice(1, -1))
        document.getElementById("cont").innerHTML = html
    })
}

populateCont()

function finishReview() {
    document.getElementById("rf").classList = "reviewerForm"
}
function completeReview() {
    let formData = new FormData();
    
    formData.append("entry.1643100856", document.getElementById("reviewerTitle").innerText + "\n" + document.getElementById("reviewerSub").innerText + "\n" + document.getElementById("cont").innerHTML);
    formData.append("entry.1051208987", document.getElementById("approve").value)
    formData.append("entry.504218849", document.getElementById("tag").value)
    formData.append("entry.1662805031", document.getElementById("pwd").value)
    formData.append("entry.132189431", authorName)
    formData.append("entry.1907955961", window.location.href.split("?")[window.location.href.split("?").length - 1])
    
    fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSdDjs022lp-oJBclFZmGHO_fXQAOkt8Z8pTDZ9ZXv25NEWYxg/formResponse', {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Allows for cross-origin requests without redirect
    }).then(x => {
        closeRF()
        alert("Thank you!")
    })
}
function closeRF() {
    document.getElementById("rf").classList = "reviewerForm hiddenRF"
}