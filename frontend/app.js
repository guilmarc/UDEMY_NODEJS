const bodyParser = require("body-parser");
const express = require("express");
const morgan = require('morgan');
const twig = require("twig");

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.get("/", (req, res) => {

    //res.sendFile(__dirname + "/views/index.twig");
    res.render("index.twig", {
        "name" : req.params.name
    })
});



app.listen(8081, ()=> {
    console.log("Started on port " + 8081);
});