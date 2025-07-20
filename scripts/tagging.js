function deactivateTag(ta, but) {
    let stos = document.getElementsByClassName(ta + "TAG")
    but.className = !stos[0].hidden ? "" : "tagSelected"
    for (let sto of stos) {
        sto.previousElementSibling.hidden = !sto.hidden
        sto.hidden = !sto.hidden
    }
}