function uploadTextArticleToZenodo(articleTitle, articleText, authorName, description) {
  const ACCESS_TOKEN = "???";

  // Step 1: Create a new deposition
  const createResponse = UrlFetchApp.fetch("https://zenodo.org/api/deposit/depositions", {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + ACCESS_TOKEN },
    payload: JSON.stringify({})
  });

  const deposition = JSON.parse(createResponse.getContentText());
  const depositionId = deposition.id;
  const bucketUrl = deposition.links.bucket;

  Logger.log("Created deposition ID: " + depositionId);
  Logger.log("Bucket URL: " + bucketUrl);

  // Step 2: Create a Blob from the article text (as a .txt file)
  const fileName = articleTitle.replace(/\W+/g, '_').toLowerCase() + ".txt";
  const fileBlob = Utilities.newBlob(articleText, "text/plain", fileName);

  // Upload the blob
  const uploadUrl = bucketUrl + "/" + encodeURIComponent(fileBlob.getName());

  const uploadResponse = UrlFetchApp.fetch(uploadUrl, {
    method: "put",
    contentType: "application/octet-stream",   // force this content type
    payload: fileBlob.getBytes(),
    headers: { Authorization: "Bearer " + ACCESS_TOKEN }
  });

  Logger.log("File upload status: " + uploadResponse.getResponseCode());

  // Step 3: Add metadata (title, author, description)
  const metadata = {
    metadata: {
      title: articleTitle,
      upload_type: "publication",
      publication_type: "article",
      description: description,
      creators: [
        { name: authorName }
      ],
      "license": "other-closed"
    }
  };

  const metadataResponse = UrlFetchApp.fetch(`https://zenodo.org/api/deposit/depositions/${depositionId}`, {
    method: "put",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + ACCESS_TOKEN },
    payload: JSON.stringify(metadata)
  });

  Logger.log("Metadata updated: " + metadataResponse.getResponseCode());

  // Step 4: Publish deposition to get DOI
  const publishResponse = UrlFetchApp.fetch(`https://zenodo.org/api/deposit/depositions/${depositionId}/actions/publish`, {
    method: "post",
    headers: { Authorization: "Bearer " + ACCESS_TOKEN }
  });

  const publishedData = JSON.parse(publishResponse.getContentText());

  return publishedData.doi
}