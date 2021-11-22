let localCartData = {};
let saberInfo = {};

//Gets called from localCart.js when the fetch is completed
const initPage = localData => {
    localCartData = localData;
    fetch("/config.json")
    .then(response => response.json())
    .then(promise_data => {
        saberInfo = promise_data.saber;
        //Display cart if there are items, else display "Cart empty"
        if(localCartData.cart.items.length > 0) {
            createCartItemDivs();
            updatePriceTotal(localCartData.cart);
        }
        else {
            document.getElementById("cart_body").innerHTML = "";
            let emptyCartText = document.createElement("p");
            emptyCartText.setAttribute("id", "emptyCartText");
            emptyCartText.innerHTML = "Your cart is empty";
            document.getElementById("cart_body").appendChild(emptyCartText);

        }
    });
}


//Generate HTML for each cart item
const createCartItemDivs = () => {
    for(let i = 0; i < localCartData.cart.items.length; i++) {
        
        let productId = localCartData.cart.items[i].name.split("_");
        let itemInfo = saberInfo[productId[0]][productId[1]];

        let imgDiv = document.createElement("div");
        imgDiv.classList.add("cartDivImg");
        imgDiv.style.backgroundImage = `url(${itemInfo.img_url})`;
        

        let priceDiv = document.createElement("div");
        priceDiv.innerHTML = itemInfo.price;
        priceDiv.classList.add("cartDivPrice");

        let quantityDisplayDiv = document.createElement("div");
        quantityDisplayDiv.innerHTML = localCartData.cart.items[i].quantity;
        quantityDisplayDiv.classList.add("cartDivQuantityDisplay");
        
        let incrementBtn = document.createElement("div");
        incrementBtn.classList.add("incrementQuantityBtn");
        incrementBtn.addEventListener("click", incrementQuantity);
        incrementBtn.innerHTML = "&#8743;";
        
        let decrementBtn = document.createElement("div");
        decrementBtn.classList.add("decrementQuantityBtn");
        decrementBtn.addEventListener("click", decrementQuantity);
        decrementBtn.innerHTML = "&#8744;";


        let nameDiv = document.createElement("div");
        if(itemInfo.owner == "You") {
            nameDiv.innerHTML = "Custom Lightsaber";  
            incrementBtn.classList.add("disabled");
            decrementBtn.classList.add("disabled");
        } 
        else {
            nameDiv.innerHTML = `${itemInfo.owner}'s Lightsaber`; 
        }
        nameDiv.classList.add("cartDivName");


        let quantityButtonsContainer = document.createElement("div");
        quantityButtonsContainer.appendChild(incrementBtn);
        quantityButtonsContainer.appendChild(decrementBtn);
        quantityButtonsContainer.classList.add("cartDivButtonContainer");

        let quantityContainerDiv = document.createElement("div");
        quantityContainerDiv.appendChild(quantityDisplayDiv);
        quantityContainerDiv.appendChild(quantityButtonsContainer);
        quantityContainerDiv.classList.add("cartDivQuantityContainer");

        let cancelItemBtn = document.createElement("div");
        cancelItemBtn.classList.add("cartDivCancelBtn");
        cancelItemBtn.addEventListener("click", cancelItem);
        cancelItemBtn.innerHTML = "X";


        let containerDiv = document.createElement("div");
        containerDiv.dataset.productId = localCartData.cart.items[i].name;
        containerDiv.id = localCartData.cart.items[i].name;
        containerDiv.dataset.index = i;
        containerDiv.appendChild(imgDiv);
        containerDiv.appendChild(nameDiv);
        containerDiv.appendChild(priceDiv);
        containerDiv.appendChild(quantityContainerDiv);
        containerDiv.appendChild(cancelItemBtn);

        document.getElementById("cartItemsContainer").appendChild(containerDiv);
    }
}

//Event listener for "X" button. Removes the item from the local cart and recreates html again
const cancelItem = evt => {
    let index = evt.target.parentElement.dataset.index;
    localCartData.cart.items.splice(index, 1);
    updateView(localCartData.cart);
    document.getElementById("cartItemsContainer").innerHTML = "";
    createCartItemDivs();

}

const updateView = cart => {
    updateCartText(cart.items);
    updatePriceTotal(cart);
}

//Updates the total price on the screen and in the cart object
const updatePriceTotal = cart => {
    let total = 0;
    for(let i = 0; i < cart.items.length; i++) {
        let productId = cart.items[i].name.split("_");
        let itemInfo = saberInfo[productId[0]][productId[1]];
        console.log(parseFloat(itemInfo.price.substring(1)), cart.items[i].quantity);
        total += parseFloat(itemInfo.price.substring(1)) * cart.items[i].quantity; 
    }
    total = total.toFixed(2);
    cart.total = total;
    document.getElementById("totalPrice").innerHTML = `$${total}`;
}

//increase the quantity of an item if the button is not disabled
const incrementQuantity = evt => {
    if(!evt.target.classList.contains("disabled")) {
        changeQuantity(evt.target.parentElement.parentElement.parentElement, 1);
    }
}

//decrease the quantity of an item if the button is not disabled
const decrementQuantity = evt => {
    if(!evt.target.classList.contains("disabled")) {
    changeQuantity(evt.target.parentElement.parentElement.parentElement, -1);
    }
}

//Change the quanitity count. Prevents count from going negative
const changeQuantity = (evt, value) => {
    for(let i = 0; i < localCartData.cart.items.length; i++) {
        if(localCartData.cart.items[i].name == evt.dataset.productId) {
            localCartData.cart.items[i].quantity += value;
            if(localCartData.cart.items[i].quantity <= 0) {
                localCartData.cart.items[i].quantity = 0;
            }
            document.getElementById(evt.dataset.productId).getElementsByClassName("cartDivQuantityDisplay")[0].innerHTML = localCartData.cart.items[i].quantity;
            updateView(localCartData.cart);
        }
    }
}

