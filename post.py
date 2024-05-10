title = input("Title: ")
img = input("Image url: ")
file = open(input("File Path: "), "r")
newFile = open("posts/" + title.replace(" ", "_").lower() + ".html", "w")
content = file.read()
content = content[content.index("</style>") + 44:-14]
newFile.write(f"""<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<title>{title}</title>
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta name="description" content="" />
	<link rel="stylesheet" type="text/css" href="../style.css" />
	<link rel="icon" href="">
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
newMain += f"""<a class="card" href="{"posts/" + title.replace(" ", "_").lower() + ".html"}"> 
				<img class="thumbnail" src="{img}">
				<div class="caption">
					<h2>{title}</h2>
					<p>{today.strftime("%m.%d.%Y")}</p>
				</div>
			</a>"""
newMain += main[start+19:]
open("index.html", "w").write(newMain)