
//Generates random number for order confirmation 
const createRandomOrderNumber = () => {
    let code = "";
    if(document.getElementById("nameSpan").dataset.name.trim().toLowerCase() == "eric") {
        code = "420-69";
    }
    else {
        for(let i = 0; i < 6; i++) {
            if(i == 3) {
                code += "-"
                continue;
            }
            code += Math.floor(Math.random()*10);
        }
    }
    document.getElementById("orderConfirmationCode").innerHTML = `Confirmation code: ${code}`;
    
}


createRandomOrderNumber();