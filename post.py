title = input("Title: ")
img = input("Image url: ")
file = open("raw/" + input("File Path: ") + ".html", "r")
newFile = open("posts/" + title.replace(" ", "_").lower() + ".html", "w")
content = file.read()
content = content[content.index("</style>") + 44:-14]
newFile.write(f"""<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<title>{title}</title>
	<meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content="Hwalgi is host to award-winning, unflinching, uncompromised opinions." />
	<link rel="stylesheet" type="text/css" href="../style.css" />
	<link rel="icon" href="../icon.png">
    <!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://hwalgi.williamck.org/{"posts/" + title.replace(" ", "_").lower() + ".html"}" />
	<meta property="og:title" content="{title}" />
	<meta property="og:description" content="Hwalgi is host to award-winning, unflinching, uncompromised opinions." />
	<meta property="og:image" content="https://i.ibb.co/RN5Qk2N/Screenshot-2024-05-29-at-11-54-46-AM.png" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://hwalgi.williamck.org/{"posts/" + title.replace(" ", "_").lower() + ".html"}" />
	<meta property="twitter:title" content="{title}" />
	<meta property="twitter:description" content="Hwalgi is host to award-winning, unflinching, uncompromised opinions." />
	<meta property="twitter:image" content="https://i.ibb.co/RN5Qk2N/Screenshot-2024-05-29-at-11-54-46-AM.png" />
</head>
<body>
	<div class="header">
        <a href="/">Back to home</a>
		<p>William Choi-Kim presents</p>
		<h1 class="title">{title}</h1>
	</div>
	<div class="content">
		{content}
	</div>
    <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rockwill" data-description="Support me on Buy me a coffee!" data-message="" data-color="#FF813F" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
</body>
</html>""")

from datetime import date

today = date.today()

main = open("index.html", "r").read()
start = main.index("<!-- last post -->")
newMain = main[:start]
newMain += f"""<a class="card" href="{"posts/" + title.replace(" ", "_").lower() + ".html"}"> 
				<img class="thumbnail" src="{img}">
				<div class="caption">
					<h2><span>{title}</span></h2>
					<p>{today.strftime("%%Y")}</p>
				</div>
			</a>
			"""
newMain += main[start:]
open("index.html", "w").write(newMain)