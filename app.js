const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/test";
const session = require("express-session");
const flash = require("connect-flash");

const registrationRoute = require("./routes/registration");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "Happy",
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

app.use("/", registrationRoute);

app.use((req, res, next) => {               // Page Not Found.
    res.end("<h1> Page Not Found </h1>");
})

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        app.listen(8080, () => {
            console.log("Server Started");
        });
    })
    .catch(err => {
        console.log("Error In Connection");
        console.log(err);
    });

