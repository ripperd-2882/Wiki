const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

const articleSchema = {
    name: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function (req, res) {
    Article.find().then(function (foundArticles) {
        res.send(foundArticles);
    })
        .catch(function (err) {
            res.send(err)
        })
})

app.post("/articles",function (req,res) {   
    console.log();
    console.log();

    const newArticle=new Article({
        title:req.body.title,
        content:req.body.content
    });

    newArticle.save().then(function (){
        res.send("Added successfully");
    })
    .catch(function (err) {
        res.send(err);        
    });
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
});