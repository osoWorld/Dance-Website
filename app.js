const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

const app = express();
const port = 80;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://osoworldS:MianSuffian74@cluster0.rg6n4.mongodb.net/?retryWrites=true&w=majority&appName=DanceContact");
}


 //THIS IS JUST TO CHECK FOR CONNECTION
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //we are connected
    console.log("we are connected bro")
});

// EXPRESS STUFF
app.use("/static", express.static("static"))    // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view-engine", "pug");
app.set("views", path.join(__dirname, "views"));


 // SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

 // MODEL
const Contact = mongoose.model('Contact', contactSchema);

// ENDPOINTS
app.get("/", (req, res) => {
    const params = {};
    res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
    const params = {};
    res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
    let myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("<h1>You have been registered successfully</h1>")
    }).catch(() => {
        res.status(400).send("<h1> An error occured. Please try again later</h1>")
    })
});



// START THE SERVER
app.listen(port, ()=> {
    console.log(`The application has successfully started on port ${port}`);
});