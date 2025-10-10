
function getColorfulness(colorString) {
    // Create a temporary element to parse the color
    const div = document.createElement('div');
    div.style.color = colorString;
    document.body.appendChild(div);
    
    // Get computed RGB values
    const rgb = window.getComputedStyle(div).color;
    document.body.removeChild(div);
    
    // Parse RGB values
    const rgbMatch = rgb.match(/\d+/g);
    const [r, g, b] = rgbMatch.map(Number);
    
    // Convert to HSL
    const hsl = rgbToHsl(r, g, b);
    
    // Return saturation (0 = grayscale, 1 = fully colorful)
    return hsl.s;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    
    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        
        switch (max) {
            case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
            case g: h = (b - r) / delta + 2; break;
            case b: h = (r - g) / delta + 4; break;
        }
        h /= 6;
    }
    
    return { h, s, l };
}

function sanitizeText(text) {
  console.log(text)
  canvas = document.createElement("div")
  canvas.innerHTML = text

  canvas.querySelectorAll('*').forEach(el => {
      el.style.removeProperty('font-size');
      el.style.removeProperty('font-family');
      if (el.style.backgroundColor == "transparent" || el.style.backgroundColor == "rgba(0, 0, 0, 0)" || el.style.backgroundColor == "rgb(255, 255, 255)" || el.style.backgroundColor == "white") {
          el.style.backgroundColor = "";
      }
      getColorfulness(el.style.color)
      if (getColorfulness(el.style.color) < 0.1) {
          el.style.color = "";
      }
      el.style.removeProperty("font-variant-numeric")
      el.style.removeProperty("font-variant-east-asian")
      el.style.removeProperty("font-variant-alternates")
      el.style.removeProperty("font-variant-position")
      el.style.removeProperty("font-variant-emoji")
      el.style.removeProperty("vertical-align")
      el.style.removeProperty("white-space-collapse")
      el.removeAttribute("id")
      el.removeAttribute("dir")
      el.style.removeProperty("line-height")
      el.style.removeProperty("margin-top")
      el.style.removeProperty("margin-bottom")
      el.style.removeProperty("word-wrap")
      el.style.removeProperty("text-indent")
  });
  while (canvas.innerHTML.includes("  ")) {
      canvas.innerHTML = canvas.innerHTML.replaceAll("  ", " ");
  }
  while (canvas.innerHTML.includes("\n\n")) {
      canvas.innerHTML = canvas.innerHTML.replaceAll("\n\n", "\n");
  }
  return canvas.innerHTML
}