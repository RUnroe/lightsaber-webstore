let localData = {};
let saberInfo = {};

let errors = {
    name : true,
    address : true,
    phone : true,
    email : true,
}


//Ganerate HTML for each item in cart
const createCartDivs = () => {
    for(let i = 0; i < localData.cart.items.length; i++) {

        let productId = localData.cart.items[i].name.split("_");
        let itemInfo = saberInfo[productId[0]][productId[1]];

        let nameDiv = document.createElement("div");
        nameDiv.classList.add("orderCartName");
        if(itemInfo.owner == "You") {
            nameDiv.innerHTML = "Custom Lightsaber";  
        } 
        else {
            nameDiv.innerHTML = `${itemInfo.owner}'s Lightsaber`; 
        }

        let quantityDiv = document.createElement("div");
        quantityDiv.classList.add("orderCartQuantity");
        quantityDiv.innerHTML = localData.cart.items[i].quantity;

        let containerDiv = document.createElement("div");
        containerDiv.appendChild(nameDiv);
        containerDiv.appendChild(quantityDiv);
        document.getElementById("cartContainer").appendChild(containerDiv);
    }
    let nameDiv = document.createElement("div");
    nameDiv.classList.add("orderCartName");
    nameDiv.innerHTML = "Total";

    let quantityDiv = document.createElement("div");
    quantityDiv.classList.add("orderCartQuantity");
    quantityDiv.innerHTML = `$${localData.cart.total}`;

    let containerDiv = document.createElement("div");
    containerDiv.appendChild(nameDiv);
    containerDiv.appendChild(quantityDiv);
    document.getElementById("cartContainer").appendChild(containerDiv);
}


const submitForm = () => {
    return !(hasError());
}

//Check for any errors in user input on form
const hasError = () => {
    let keys = Object.keys(errors);
    let keysWithErrors = [];
    const values = Object.values(errors);
    for(let i = 0; i < values.length; i++) {
        if(values[i]){
            keysWithErrors.push(keys[i]);
        }
    }
    console.log(keysWithErrors);
    if(keysWithErrors.length == 0){
        return false;
    }
    for(let i = 0; i < keysWithErrors.length; i++) {
        setRed(document.getElementById(keysWithErrors[i]));
    }
    document.getElementById("headErrMsg").style.visibility = "";
    return true;
}


//Input event handler
const inputHandler = evt => {
    let regex = "";
    switch(evt.target.id) {
        case "name":
            regex = /./;
            break;
        case "email":
            regex = /.+@.{2,}\..{2,}/;
            break;
        case "address":
            regex = /.+ .+/;
            break;
        case "phone":
            regex = /^(1?\([0-9]{3}\)( |)|(1-|1)?[0-9]{3}-?)[0-9]{3}-?[0-9]{4}$/m;
    }
    
    validate(evt.target, regex);
}

//checks input against regex
const validate = (target, regex) => {
    let input = document.getElementById(target.id).value;
    if(regex.test(input)){
        setGreen(target);
    }
    else {
        setRed(target);
    }
}


//sets red class to target
const setRed = target => {
    document.getElementById(target.id).classList.add("red");
    document.getElementById(target.id).classList.remove("green");
    errors[target.id] = true;
    showErrorText(target);
}

//sets green class to target
const setGreen = target => {
    document.getElementById(target.id).classList.remove("red");
    document.getElementById(target.id).classList.add("green");
    errors[target.id] = false;
    hideErrorText(target);
}

const showErrorText = target => {
    target.parentNode.lastElementChild.style.visibility = "";
}

const hideErrorText = target => {
    target.parentNode.lastElementChild.style.visibility = "hidden";
}



const setEventListeners = () => {
    let inputs = document.getElementsByTagName("input");
    for(let i = 0; i < inputs.length-1; i++) {
        inputs[i].addEventListener("input", inputHandler);
        hideErrorText(inputs[i]);
    }
}




fetch("/user_info.json")
  .then(response => response.json())
  .then(promise_data => {
    localData = promise_data;
    fetch("/config.json")
    .then(response => response.json())
    .then(promise_data => {
        saberInfo = promise_data.saber;
        createCartDivs();
        setEventListeners();
        document.getElementById("headErrMsg").style.visibility = "hidden";
    });
});