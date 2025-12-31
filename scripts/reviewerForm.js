var authorName = ""

function finishReview() {
    document.getElementById("rf").classList = "reviewerForm"
}
function completeReview() {
    if (document.getElementById("pwd").value.trim() == "") {
        alert("Please enter your password.")
        return
    }

    let formData = new FormData();

    allSources = document.getElementById("sourcesBox").value.split("\n").map(x => x.trim()).filter(x => x != "");


    formData.append("entry.1643100856", document.getElementById("reviewerTitle").innerText + "\n" + document.getElementById("reviewerSub").innerText + "\n" + document.getElementById("cont").innerHTML + `
    <details id="sources">
      <summary>Sources</summary>
      ${allSources.length == 0 ? "This article does not have listed sources." : "<ol>"}
      ${allSources.length == 0 ? "" : allSources.map(x => `<li>${x}</li>`).join("\n")}
      ${allSources.length == 0 ? "" : "</ol>"}
    </details>`);
    formData.append("entry.1051208987", document.getElementById("approve").value)
    formData.append("entry.504218849", document.getElementById("tag").value)
    formData.append("entry.1662805031", document.getElementById("pwd").value)
    formData.append("entry.132189431", authorName)
    formData.append("entry.1907955961", window.location.href.split("?")[window.location.href.split("?").length - 1])


    fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzHtt1-FLZgKBvCzwbrfHiY129oKg1ecKKksXo3dsY_HRVmHz2ftWWG4jFDs0YFTPUYZGRnfQ_Hs9/pub?gid=58679177&single=true&output=csv&random=${Date.now()}`).then(r => r.text()).then(t => {
        allT = t.split("\n").map(x => x.split(","))
        allReviewedIDs = allT.map(x => x[0])

        if (allReviewedIDs.includes(window.location.href.split("?")[window.location.href.split("?").length - 1]) && !window.location.href.includes("/edit")) {
            alert("This has already been reviewed.")
            window.location.href = "/pending.html"
        } else {
            fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSdDjs022lp-oJBclFZmGHO_fXQAOkt8Z8pTDZ9ZXv25NEWYxg/formResponse', {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Allows for cross-origin requests without redirect
            }).then(x => {
                closeRF()
                alert("Thank you!")
                if (window.location.href.includes("/edit")) {
                    window.location.href = "/published.html"
                } else {
                    window.location.href = "/pending.html"
                }
            })
        }
    })
}
function closeRF() {
    document.getElementById("rf").classList = "reviewerForm hiddenRF"
}