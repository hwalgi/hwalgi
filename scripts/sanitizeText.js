function findColorRgbIndices(input) {
  const regex = /color:\s*rgb\([^)]*\)/g;
  const matches = [];
  
  let match;
  while ((match = regex.exec(input)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length
    });
  }
  
  return matches;
}

function sanitizeText(text) {
    text = text.replaceAll("<span><p", "<p")
    text = text.replaceAll("line-height:", "wtv:").replaceAll("font-family:", "wtv:").replaceAll("word-wrap:", "wtv:").replaceAll("text-indent:", "wtv:")
    findColorRgbIndices(text).reverse().forEach(x => {
        rgbValues = text.slice(x.start, x.end + 1,).replaceAll("color: rgb(", "").replaceAll(");", "").split(",").map(y => parseFloat(y))
        if (Math.max(...rgbValues) - Math.min(...rgbValues) < 5) {
            text = text.slice(0, x.start) + text.slice(x.end + 1,)
        } else {
            rgbValues = rgbValues.map(y => y + (255 - Math.max(...rgbValues)))
            text = text.slice(0, x.start) + `color: rgb(${rgbValues.join(",")});` + text.slice(x.end + 1,)
        }
    })
    return text
}