import os
import time
import re

def update_html_files(directory):
    # Seconds since epoch (int)
    version = str(int(time.time()))

    # Regex patterns to match .css or .js with optional query strings
    css_pattern = re.compile(r'(\.css)(\?[^"\']*)?')
    js_pattern = re.compile(r'(\.js)(\?[^"\']*)?')

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)

                # Read file content
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Replace .css and .js with new version
                new_content = css_pattern.sub(rf"\1?v={version}", content)
                new_content = js_pattern.sub(rf"\1?v={version}", new_content)

                # Only write if changes happened
                if new_content != content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Updated: {file_path}")

if __name__ == "__main__":
    update_html_files("./")  # Change to your target directory
