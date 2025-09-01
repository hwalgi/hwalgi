function getSplat(str) {
    splat = str.replace(/[^a-zA-Z]/g, "_").toLowerCase();
    while (splat.includes("__")) {
        splat = splat.replaceAll("__", "_")
    }
    if (splat.startsWith("_")) {
        splat = splat.slice(1,)
    }
    if (splat.endsWith("_")) {
        splat = splat.slice(0, -1) 
    }
    return splat
}