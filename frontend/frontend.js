const bodyParser = require("body-parser");
const express = require("express");
const morgan = require('morgan');
const twig = require("twig");
const axios = require("axios");

const frontend = express();
frontend.use(morgan('dev'));
frontend.use(bodyParser.json());
frontend.use(bodyParser.urlencoded({ extended : true }));

var fetch = axios.create({
    baseURL: "http://localhost:8080/api/v1"
});

//TODO: Remove this PATCH cause render should lookup in the views folder
frontend.set('views', __dirname + "/views/");

frontend.get("/", (req, res) => {



    //res.sendFile(__dirname + "/views/index.twig");
    res.render("index.twig", {
        "name" : req.query.name
    })
});


frontend.get("/members", (req, res) => {

    fetch.get("/members")
        .then(response => {
            if( response.data.status === "success" ){
                res.render("members.twig", {
                    members: response.data.payload
                })
            } else {
                renderError(res, "response.data.message")
            }
        })
        .catch(err => {
            renderError(res, err.message)
        })
});


frontend.listen(8081, ()=> {
    console.log("Started on port " + 8081);
});


//Fonctions
function renderError(res, errMsg) {
    res.render( "error.twig", {
        "error" : errMsg
    })
}