const formAttributes = {
    "name": "entry.1594192402",
    "email": "entry.1880093296",
    "school": "entry.240437314",
    "hours": "entry.1237476617",
    "topic": "entry.1118448734",
    "subtitle": "entry.1554651532",
    "text": "entry.1817590422"
}

function submitForm() {
    try {
        submitInner();
    } catch (error) {
        window.location.href = "/formOut_fail.html"
    }
}

function submitInner() {
    good = true
    const formData = new FormData();
    for (el of [...document.getElementById("submissionForm").children].filter(e => Object.keys(formAttributes).includes(e.id))) {
        if (el.id == "text") {
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
    
    if (good) {
        fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfQHvRNYlPBdWp3bI4FY5BlSGBovsynhuwuzMSwemeGoerrmg/formResponse', {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Allows for cross-origin requests without redirect
        })
        .then(response => {
            response.text().then(x => window.location.href = "/formOut_success.html")
            setTimeout(() => {window.location.href = "/formOut_timeout.html" }, 3000);
        })
        .catch(error => {
            window.location.href = "/formOut_fail.html"
        });
    } else {
        alert("Please fill out all required fields.")
    }
}