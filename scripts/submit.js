const formAttributes = {
    "name": "entry.1594192402",
    "email": "entry.1880093296",
    "school": "entry.240437314",
    "hours": "entry.1237476617",
    "topic": "entry.1118448734",
    "subtitle": "entry.1554651532",
    "text": "entry.1817590422"
}

async function submitForm() {
    try {
        await submitInner();
    } catch (error) {
        window.location.href = "/formOut_fail.html"
    }
}

async function submitInner() {
    if (document.getElementById("agree").checked == false) {
        alert("You must agree to the terms before submitting.")
        return
    }
    good = true
    const formData = new FormData();
    for (el of [...document.getElementById("submissionForm").children].filter(e => Object.keys(formAttributes).includes(e.id))) {
        if (el.id == "text") {
            content = el.innerHTML

            content = content.replaceAll(/font-size:\s*[^;]+;/g, "")
            content = content.replaceAll("font-family: Arial, sans-serif;", "");
            content = content.replaceAll("color: rgb(20, 22, 23);", "");
            content = content.replaceAll("background-color: transparent;", "");
            content = content.replaceAll("font-variant-numeric: normal;", "");
            content = content.replaceAll("font-variant-east-asian: normal;", "");
            content = content.replaceAll("font-variant-alternates: normal;", "");
            content = content.replaceAll("font-variant-position: normal;", "");
            content = content.replaceAll("font-variant-emoji: normal;", "");
            content = content.replaceAll("vertical-align: baseline;", "");
            content = content.replaceAll("white-space-collapse: preserve;", "");
            while (content.includes("  ")) {
                content = content.replaceAll("  ", " ");
            }
            while (content.includes("\n\n")) {
                content = content.replaceAll("\n\n", "\n");
            }
            content = content.replaceAll(/\s*id="[^"]*"/g, "")
            content = content.replaceAll(/\s*dir="[^"]*"/g, "")
            content = content.replaceAll("\" ", "\"")
            content = content.replaceAll(" \"", "\"")
            content = content.replaceAll("style=\"\"", "")
            content = content.replaceAll("line-height:2.4;", "")
            content = content.replaceAll("margin-top:0pt;", "")
            content = content.replaceAll("margin-bottom:0pt;", "")
            content = content.replaceAll("color: rgb(51, 51, 51);", "")

            el.innerHTML = content

            formData.append(formAttributes[el.id], el.innerHTML);
            if (el.innerText.trim() == "") {
                good = false
            }
        } else {
            formData.append(formAttributes[el.id], el.value);
            if (el.value.trim() == "") {
                good = false
            }
        }
    }

    const submissionID = Date.now() + "-" + Math.round(Math.random()*1000000)
    formData.append("entry.639522065", submissionID);
    
    if (good) {
       formSubmit = await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfQHvRNYlPBdWp3bI4FY5BlSGBovsynhuwuzMSwemeGoerrmg/formResponse', {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Allows for cross-origin requests without redirect
        })

        window.location.href = `/form_status.html?${submissionID}`
    } else {
        alert("Please fill out all required fields.")
    }
}