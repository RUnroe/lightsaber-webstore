
let navExpanded = false;

//toggles whether the mobile view nav bar is expanded or not
const toggleMobileNav = evt => {
    let nav = document.getElementById("nav");
    if(nav.style.height == "100%") {
        nav.style.height = "0";
        navExpanded = false;
    }
    else{
        nav.style.height = "100%";
        setTimeout(() => {navExpanded = true;}, 10);
    }
}


//Update the cart item count
const updateText = cartData => {
    let cartItemCount = 0;
    for(let i = 0; i < cartData.items.length; i++) {
        cartItemCount += ~~cartData.items[i].quantity;
    }

    document.getElementById("Cart").innerHTML = `Cart (${cartItemCount})`;
}


fetch("/user_info.json")
    .then(response => response.json())
    .then(promise_data => {
       updateText(promise_data.cart);
});

document.getElementById("menuBtn").addEventListener("click", toggleMobileNav);


//scrolls page to top before exit
const redirectPage = link => {
    window.scrollTo(0,0);
    let interval = setInterval(() => {
        if(window.scrollY <= 5) {
            window.location.href = link;
            clearInterval(interval);
            return false;
        }
    }, 10);
    
}

document.onclick = evt => {
    evt = evt || window.event;
    var element = evt.target || evt.srcElement;
    if (element.tagName == 'A' && window.innerWidth > 600) {
        redirectPage(element.href);
        return false; // prevent default action
    }
    else if(element.closest("a") && window.innerWidth > 600) {
        element = element.closest("a");
        redirectPage(element.href);
        return false; // prevent default action
    }
    if(navExpanded) {
        document.getElementById("nav").style.height = "0";
        navExpanded = false;
    }
    return true;
};


 