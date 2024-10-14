document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission
    
    const formData = new FormData(this);
    
    fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfQHvRNYlPBdWp3bI4FY5BlSGBovsynhuwuzMSwemeGoerrmg/formResponse', {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Allows for cross-origin requests without redirect
    })
    .then(response => {
        console.log('Form submitted successfully', response);
        document.getElementById("message").innerText = "Thank you! Your submission has been received and will be reviewed."
        document.getElementById("message").hidden = false
        // You can add additional logic here, like displaying a success message
    })
    .catch(error => {
        console.error('Error submitting form', error);
        document.getElementById("message").innerText = "Something went wrong."
        document.getElementById("message").hidden = false
    });
});