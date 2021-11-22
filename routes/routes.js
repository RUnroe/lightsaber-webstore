const config = require("../public/config");
let user_info = require("../public/user_info");
const fs = require("fs");

exports.index = (req, res) => {
    res.render("index", {"config": config});
}

exports.features_name = (req, res) => {
    let input = req.params.name.split("_");
    let saber = config.saber[input[0]][input[1]];
    res.render("features", {
        "config": config,
        "id": saber.id,
        "color": saber.color,
        "weight": saber.weight,
        "owner": saber.owner,
        "hilt_length": saber.hilt_length,
        "price": saber.price,
        "culture": saber.culture,
        "img_url": saber.img_url,
        "alignment": saber.alignment
    });
}

exports.custom = (req, res) => {
    res.render("custom", {"config": config});
}

exports.cart = (req, res) => {
    res.render("cart", {"config": config});
}

exports.order = (req, res) => {
    res.render("order", {"config": config});
}

exports.confirmation = (req, res) => {
    let user =  {
        "name": req.body.name,
        "address": req.body.address,
        "phone": req.body.phone,
        "email": req.body.email
    }
    fs.readFile("public/user_info.json", (err, data) => {
        if (err) throw err;
        let userInfo = JSON.parse(data);
        userInfo.user = user;
        //clear cart
        userInfo.cart.items = [];
        userInfo.cart.total = 0;
        fs.writeFile("public/user_info.json", JSON.stringify(userInfo), "utf8", err => {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            res.render("confirmation", {"config": config, "name":user.name});
        });
      });
    
}

exports.updateCart = (req, res) => {
    fs.writeFile("public/user_info.json", JSON.stringify(req.body), "utf8", err => {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        res.send("OK");
    });
}