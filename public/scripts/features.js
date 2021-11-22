
// Set dark theme if viewing a sith culture saber
window.onload = () => {
    if(document.getElementById("culture").innerHTML.trim().toLowerCase() == "sith") {
        document.body.setAttribute('data-theme', 'dark');
    }
}




