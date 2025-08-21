# Hwalgi
Empowering student voices
## Technical Details
Hwalgi's technical backend is messy, complicated, mildly exploitative of Cloudflare and Google services - but it's built that way becuase it keeps the cost of running Hwalgi at effectively 0.

The submission is handled with a reverse-engineered Google Form that pushes results to a Google Sheets. The Google Sheets has a rather long AppScript attached to it to register DOI indices for each published article. The frontend is served on Cloudflare Pages (with some proxying magick from _redirects to make the on-load dynamically generated article pages indexable) and rendered with JS.
## Site
Hwalgi is available at [https://hwalgi.williamck.org](https://hwalgi.williamck.org).
## License
This site and its contents retain `All Rights Reserved`. Using any of the materials available from or on this site is a copyright violation.
