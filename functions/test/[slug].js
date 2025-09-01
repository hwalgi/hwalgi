export async function onRequest(context) {
  const { slug } = context.params;

  // Generate HTML that includes the slug
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Article: ${slug}</title>
      </head>
      <body>
        <h1>Article page</h1>
        <p>You requested: <strong>${slug}</strong></p>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
