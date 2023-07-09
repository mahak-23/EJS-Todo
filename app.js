const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

var app = express();
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

const mongoose = require("mongoose")
const Mongo_URL = process.env.DB_URL

mongoose.connect(Mongo_URL);

const trySchema = new mongoose.Schema({
    name:String
})

const item = mongoose.model("task",trySchema);

app.get('/', (req, res) => {
    item.find().then((foundItems) => {
        res.render("list", { ejes: foundItems });
    }).catch((err) => {
        console.log(err);
    });
})

app.post("/", (req,res)=>{
    const itemName=req.body.ele1;
    const todo = new item({
        name:itemName
    })
    todo.save();
    res.redirect("/")
})

app.post("/delete", (req,res)=>{
    const checked=req.body.checkbox1;
    item.findByIdAndRemove(checked).then(()=>{
        console.log("deleted");
    }).catch((err)=>{
        console.log(err)
    })
    res.redirect("/")

})

app.listen(8000, function(){
    console.log(`server started at 8000`)
});