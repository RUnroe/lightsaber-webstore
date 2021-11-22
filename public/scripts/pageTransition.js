
//Scroll down past header on all pages except for home page. This way the content is the main focus. Does not scroll on mobile view
window.onload = () => {
    if(window.innerWidth > 600) {
        setTimeout(() => { window.scrollTo(0,Math.floor(window.innerHeight*3/10)+30);}, 200);
    }
}
