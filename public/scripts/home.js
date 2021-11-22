let myData = {
    isDarkTheme : false,
    scrollPos : 0,
    firstScrollRecord : true
};

//Create HTML for each saber and sets theme
const generateSaberDivs = () => {
    document.getElementById("saberContainer").innerHTML = "";
    if(!myData.isDarkTheme) { //Jedi / White Theme
        for(let i = 0; i < myData.saberData.jedi.length; i++) {
           createSaberElement("jedi", i);
        }
        document.getElementById("changeThemeText").innerHTML = "Convert to the Darkside";
        document.body.removeAttribute('data-theme');
    }
    else {
        for(let i = 0; i < myData.saberData.sith.length; i++) {
            createSaberElement("sith", i);
        }
        document.getElementById("changeThemeText").innerHTML = "Go back to the light";
        document.body.setAttribute('data-theme', 'dark');
    }
    setTimeout(showSaberDivs, 500);
}

//Generates saber elements
const createSaberElement = (culture, i) => {
    let imgDiv = document.createElement("div");
    imgDiv.classList.add("saberImage");
    imgDiv.style.backgroundImage = `url(${myData.saberData[culture][i].img_url})`;
    let captionDiv = document.createElement("div");
    let name = document.createElement("p");
    name.innerHTML = `${myData.saberData[culture][i].owner}'s Lightsaber`;
    let containerDiv = document.createElement("div");
    let containerAnchor = document.createElement("a");
    containerAnchor.setAttribute("href", `/features/${culture}_${i}`);
    containerAnchor.setAttribute("id", `${culture}_${i}`);
    captionDiv.appendChild(name);
    containerDiv.appendChild(imgDiv);
    containerDiv.appendChild(captionDiv);
    containerAnchor.appendChild(containerDiv);
    document.getElementById("saberContainer").appendChild(containerAnchor);
}

//Change theme animations: scroll to top, hide saber divs, generate new saber divs 
const hideSaberDivs = () => {
    myData.scrollPos = window.pageYOffset;
    window.scrollTo(0,0);
    document.getElementById("changeThemeText").style.opacity = 0;
    let saberDivs = document.getElementById("saberContainer").children;

    setTimeout(() => {
        for(let i = 0; i < saberDivs.length; i++) {
            saberDivs[i].style.height = 0;
        }
        setTimeout(generateSaberDivs, 700);
    }, 400);
   
}

//Change theme animations: display saber divs and scroll to previous position
const showSaberDivs = () => {
    let saberDivs = document.getElementById("saberContainer").children;
    for(let i = 0; i < saberDivs.length; i++) {
        saberDivs[i].style.height = "27em";
    }
    if(!myData.firstScrollRecord) {
        setTimeout(() => {
            window.scrollTo(0,myData.scrollPos);
        }, 500);
    }
    myData.firstScrollRecord = false;
    setTimeout(() => {
        document.getElementById("changeThemeText").style.opacity = 1;
    }, 700);
}


const toggleTheme = evt => {
    myData.isDarkTheme = !myData.isDarkTheme;
    hideSaberDivs();
}


fetch("/config.json")
    .then(response => response.json())
    .then(promise_data => {
        myData.saberData = promise_data.saber;
        generateSaberDivs();
});

document.getElementById("changeThemeText").addEventListener("click", toggleTheme);


