document.getElementById('submissionForm').addEventListener('submit', function(event) {
    document.getElementById("commentID").value = window.location.href.split("?")[window.location.href.split("?").length - 1]
    event.preventDefault(); // Prevents the default form submission
    
    const formData = new FormData(this);
    
    fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSdhxWf1FCiUJaDYZAx462VBsv_PGlkg8Q5olsStP7zzQI3mrA/formResponse', {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Allows for cross-origin requests without redirect
    })
    .then(response => {
        document.getElementById("submissionForm").reset()
        window.location.reload()
    })
    .catch(error => {
        console.error('Error submitting form', error);
        document.getElementById("message").innerText = "Something went wrong."
        document.getElementById("message").hidden = false
    });
});

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRBLq2bMDXDUL2lzDZK_AtEdaEb7-hxhYarWduAI0cSqQGx65xpeaC6T6cgUj8cTDdkw-pKcxeKkTjj/pub?gid=1144327213&single=true&output=csv").then(x => x.text()).then(
    x => {
        if (window.location.href.includes("article/")) {
            postNum = `${window.location.href.split("/")[window.location.href.split("/").length - 1]},`
        } else {
            postNum = `${window.location.href.split("?")[window.location.href.split("?").length - 1]},`
        }
        commentsRaw = x.split("\n").filter(x => x.startsWith(postNum)).map(x => x.slice(postNum.length)).filter(x => !x.startsWith(",#N/A")).map(x => [x.slice(0, x.length - ("hwalgi" + x.split(",hwalgi")[x.split(",hwalgi").length - 1]).length - 1), "hwalgi" + x.split(",hwalgi")[x.split(",hwalgi").length - 1].trim().replace(",","")])
        document.getElementById("comments").innerHTML = ""
        for (comment of commentsRaw.reverse()) {
            commentText = comment[0]
            commentText = commentText.startsWith("\"") ? commentText.slice(1, commentText.length - 1) : commentText
            console.log(commentText)
            document.getElementById("comments").innerHTML += `
			<div class="comment">
				<sub>${comment[1].split("@")[0]}</sub>
                <small class="date">${comment[1].split("@")[1]}</small>
                <br>
				${commentText}
			</div>`
        }
        if (document.getElementById("comments").innerHTML == "") {
            document.getElementById("comments").innerHTML = "There's no comments yet. Start the discussion!"
        }
    }
)