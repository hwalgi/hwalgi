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
	<link rel="icon" href="icon.png">
    <!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://hwalgi.williamck.org/{"posts/" + title.replace(" ", "_").lower() + ".html"}" />
	<meta property="og:title" content="{title}" />
	<meta property="og:description" content="Hwalgi is host to award-winning, unflinching, uncompromised opinions." />
	<meta property="og:image" content="https://i.imgur.com/Vy3JKT4.png" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://hwalgi.williamck.org/{"posts/" + title.replace(" ", "_").lower() + ".html"}" />
	<meta property="twitter:title" content="{title}" />
	<meta property="twitter:description" content="Hwalgi is host to award-winning, unflinching, uncompromised opinions." />
	<meta property="twitter:image" content="https://i.imgur.com/Vy3JKT4.png" />
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
</body>
</html>""")

from datetime import date

today = date.today()

main = open("index.html", "r").read()
start = main.index("<div class=\"cards\">")
newMain = main[:start + 19]
newMain += f"""
<a class="card" href="{"posts/" + title.replace(" ", "_").lower() + ".html"}"> 
				<img class="thumbnail" src="{img}">
				<div class="caption">
					<h2><span>{title}</span></h2>
					<p>{today.strftime("%m.%d.%Y")}</p>
				</div>
			</a>"""
newMain += main[start+19:]
open("index.html", "w").write(newMain)