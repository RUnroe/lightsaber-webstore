let myData = {
    saberHandles: 3,
    currentHandleIndex : 0,
    price: "$7499.99",
    handleData : [
        {"weight": "4.7", "hilt_length": "28"},
        {"weight": "4.6", "hilt_length": "28"},
        {"weight": "4.5", "hilt_length": "28.5"}
    ]
};

const init = () => {
    createHandleDivs();
    changeSaberColor();
    updateTableColor(0);
    updateTableHandleProperties();
    document.getElementById("price").innerHTML = myData.price;
}

//Generate a div for each handle image and append them together in horizontal line
const createHandleDivs = () => {
    let container = document.createElement("div");
    container.setAttribute("id", "saberHandleImgContainer");
    for(let i = 0; i < myData.saberHandles; i++) {
        let tempDiv = document.createElement("div");
        tempDiv.style.backgroundImage = `url(images/handles/handle_${i}.png)`;
        tempDiv.classList.add("saberHandleImgDiv");
        container.appendChild(tempDiv);
    }
    document.getElementById("customSaberDisplay").appendChild(container);
}


//Updates which saber handle is showing
const updateHandleView = () => {
    document.getElementById("saberHandleImgContainer").style.left = `-${myData.currentHandleIndex * 250}px`;
}

//Left button click handler: cycle left in handle images if there is an image to the left
const cycleImageLeft = evt => {
    if(myData.currentHandleIndex > 0) {
        myData.currentHandleIndex--;
        updateHandleView();
    }
    updateButtons();
    
}

//Right button click handler: cycle right in handle images if there is an image to the right
const cycleImageRight = evt => {
    document.getElementById("moveRight").disabled = false;
    if(myData.currentHandleIndex < myData.saberHandles-1) {
        myData.currentHandleIndex++;
        updateHandleView();
    }
    updateButtons();
    
}

//Enable and disable arrow buttons as needed. Update after any arrow button press
const updateButtons = () => {
    updateTableHandleProperties();
    if(myData.currentHandleIndex <= 0) {
        disableButton("moveLeft");
    }
    else {
        enableButton("moveLeft");
    }
    
    if(myData.currentHandleIndex == myData.saberHandles-1) {
        disableButton("moveRight");
    }
    else {
        enableButton("moveRight");
    }

}

//Set disabled class on button passed in
const disableButton = id => {
    let button = document.getElementById(id);
    button.classList.add("disabled");
    button.classList.remove("active");
}

//Set active class on button passed in
const enableButton = id => {
    let button = document.getElementById(id);
    button.classList.add("active");
    button.classList.remove("disabled");
}

//Input handler: changes color of the box-shadow (saber glow) based on the slider input
const changeSaberColor = evt => {
    let hue = document.getElementById("colorSlider").value;
    document.getElementById("saberBlade").style.boxShadow = `0px 0px 6px 5px hsl(${hue}, 100%, 50%)`;
    updateTableColor(hue);
}

//Update color in properties table
const updateTableColor = hue => {
    document.getElementById("color").innerHTML = HSLToHex(hue);
}

//Update handle properties in properties table
const updateTableHandleProperties = () => {
    document.getElementById("weight").innerHTML = `${myData.handleData[myData.currentHandleIndex].weight} kg`;
    document.getElementById("hilt_length").innerHTML = `${myData.handleData[myData.currentHandleIndex].hilt_length} cm`;
}

const HSLToHex = h => {
    let s = 1;
    let l= 0.5;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;
  
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }


document.getElementById("moveLeft").addEventListener("click", cycleImageLeft);
document.getElementById("moveRight").addEventListener("click", cycleImageRight);
document.getElementById("colorSlider").addEventListener("input", changeSaberColor);




init();