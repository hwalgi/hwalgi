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
        console.error("Submission failed:", error);
        // window.location.href = "/formOut_fail.html"
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
            el.innerHTML = sanitizeText(el.innerHTML)

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