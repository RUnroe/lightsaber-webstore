let localData = [];
let timeout;

//Displays added to cart message and sets a timeout on it
const addToCart = evt => {
    let message = document.getElementById("addedToCartMessage");
    message.style.height = "3.2em";
    clearTimeout(timeout);
    timeout = setTimeout(() => {message.style.height = "0"}, 2800);
    addToLocalCart();
    updateCartText(localData.cart.items);

}

//If item is in cart, increase quantity. Else, add new item to cart 
const addToLocalCart = () => {
    localCart = localData.cart.items;
    let productId = document.getElementById("addToCart").dataset.productId;
    for(let i = 0; i < localCart.length; i++) {
        if(localCart[i].name == productId) {
            localCart[i].quantity++;
            return;
        }
        
    }
    localCart.push({name: productId, quantity: 1});
}


//If there is an item in the cart with quantity = 0, remove it from the cart
const clearEmptyItems = () => {
    for(let i = 0; i < localData.cart.items.length; i++) {
        if(localData.cart.items[i].quantity <= 0) {
            localData.cart.items.splice(i, 1);
            i--;
        }
    }
}

//Totals the amount of items in the cart
const updateCartText = cartData => {
    let cartItemCount = 0;
    for(let i = 0; i < cartData.length; i++) {
        cartItemCount += ~~cartData[i].quantity;
    }
    document.getElementById("Cart").innerHTML = `Cart (${cartItemCount})`;
}

//POSTS local copy of cart back to server on page exit
const updateUserInfo = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/updateCart", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(localData));
    console.log(localData, JSON.stringify(localData));
}

window.onbeforeunload = () => {
    clearEmptyItems();
    updateUserInfo();
    //Prevents prompt from showing
    return undefined;
}


fetch("/user_info.json")
  .then(response => response.json())
  .then(promise_data => {
        localData = promise_data;
        try{
            initPage(promise_data);
        } catch(e) {};
        updateCartText(localData.cart.items);
});



if(document.getElementById("addToCart")) {
    document.getElementById("addToCart").addEventListener("click", addToCart);
}

//Tweak where the "Added to Cart" message is displayed based on the sticky nav bar
window.onscroll = () => {
    let header = Math.floor(window.innerHeight*3/10);
    try {
        if(window.scrollY >= header) {
            document.getElementById("addedToCartMessage").style.top = "57px";
        }
        else {
            document.getElementById("addedToCartMessage").style.top = 0;
        }
    } catch (e) {}
}