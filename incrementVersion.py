import os
import time

def update_html_files(directory):
    # Seconds since epoch (int)
    version = str(int(time.time()))

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)

                # Read file content
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Replace .css and .js (only when not already versioned)
                new_content = content.replace(".css", f".css?v={version}")
                new_content = new_content.replace(".js", f".js?v={version}")

                # Only write if changes happened
                if new_content != content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Updated: {file_path}")

if __name__ == "__main__":
    update_html_files("./")  # Change to your target directory
