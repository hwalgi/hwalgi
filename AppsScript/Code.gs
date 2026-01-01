function onEdit(e) {
  const sheet = e.source.getSheetByName("DOIs")
  data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    row = data[i]
    title = row[0]
    author = row[1]
    content = row[2]
    doi = row[3]
    if (title != "" && doi == "") {
      outDOI=uploadTextArticleToZenodo(title, content, author, "Published on Hwalgi.org")
      sheet.getRange(i + 1, 4).setValue(outDOI);
    }
  }

  const sheet2 = e.source.getSheetByName("Reviewer Verdicts")
  data = sheet2.getDataRange().getValues();

  var alias = GmailApp.getAliases()
  Logger.log(alias)
  for (let i = 1; i < data.length; i++) {
    row = data[i]
    accepted = row[4]
    rejected = row[5]
    emailSent = row[8]
    email = row[9]
    if (email.trim() != "contact@hwalgi.org") {
      hours = row[6]
      id = row[7]
      try {
        if (id != "" && emailSent == "") {
          if (accepted != "") {
            GmailApp.sendEmail(email,"Congratulations!",`Congratulations!
            
Your submission to Hwalgi has been accepted. You can see your certificate and your published article at https://www.hwalgi.org/form_status?${id}. You were credited ${hours > 15 ? 15 : hours} hours. ${hours > 15 ? "Please note that we cap the number of hours you can receive for a single submission at 15. " : ""}We look forward to your future submissions.
            
Regards,
The Hwalgi Team`, {from: alias[0], name: "Hwalgi"})
          } else if (rejected != "") {
            GmailApp.sendEmail(email,"Thank you for your submission",`Thank you for your submission to Hwalgi. 
            
Though we are not prepared to publish your submission at this time, we have issued you ${hours > 15 ? "8" : "half of your claimed"} hours to acknowledge your efforts. You can see your certificate at https://www.hwalgi.org/form_status?${id}. We look forward to your future submissions.
            
Regards,
The Hwalgi Team`, {from: alias[0], name: "Hwalgi"})
          } else {
            GmailApp.sendEmail(email,"Hwalgi Submission Update",`Your submission has been flagged as a duplicate submission or as an invalid submission. If you received an email that your submission was approved, you can safely disregard this message. Otherwise, please email us at this address if you believe this to be a mistake. You can see the status of your submission at https://www.hwalgi.org/form_status?${id}.

Regards,
The Hwalgi Team`, {from: alias[0], name: "Hwalgi"})
          }
          sheet2.getRange(i + 1, 9).setValue("Yes");
        }
      } catch(e) {
      }
    }
  }
}