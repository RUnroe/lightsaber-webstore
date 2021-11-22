const express = require("express");
const pug = require("pug");
const path = require("path");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const fs = require("fs");


const app = express();

app.set("view engine", "pug");
app.set("views", __dirname+"/views");
app.use( bodyParser.json() );
app.use(express.static(path.join(__dirname+"/public")));

const urlencodeParser = bodyParser.urlencoded({
    extended: true
});

app.get("/", routes.index);
app.get("/features/:name", routes.features_name);
app.get("/cart", routes.cart);
app.get("/order", routes.order);
app.get("/custom", routes.custom);
app.post("/confirmation", urlencodeParser, routes.confirmation);
app.post("/updateCart", urlencodeParser, routes.updateCart);

app.listen(3001);