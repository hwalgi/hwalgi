if (window.location.href.includes("article")) {
    let splat
    if (window.location.href.includes("article/")) {
        let parts = window.location.href.split("/")
        splat = parts[parts.length - 1]
    } else {
        splat = window.location.href.split("?")[1]
    }
    getData(splat)
}