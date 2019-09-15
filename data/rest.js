const http = require('http');


const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const morgan = require('morgan'); //Middleware permettant de loguer les requêtes SQL
const config = require("./config");

const mysql = require("mysql");

var connection = mysql.createConnection({
    host    :   'localhost',
    port    :   3306,
    database:   'nodejs',
    user    :   'master',
    pass    :   ''
});

connection.connect(null, (err) => {

    if(err) {
        console.log(err);
        return;
    }

    console.log(connection.threadId);
});

let membersRouter = express.Router();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));




membersRouter.route("/:id")

    .get((req, res) => {

        connection.query("SELECT * FROM members WHERE id = " + req.params.id, (err, result) => {
            if(err) {
                res.json(error(err.message));
                return;
            }

            res.json(success(result));
        });

    });


membersRouter.route("/")

    .get((req, res) => {

        connection.query("SELECT * FROM members", (err, result) => {
           if(err) {
               res.json(error(err.message));
               return;
           }

           res.json(success(result));
        });
    });


app.use(config.rootUrl + "members", membersRouter);
app.listen(8080, () => console.log("Started on port 8080"));


function success(payload){
    return { "status" : "success", "payload" : payload}
}

function error(message){
    return { "status" : "error", "message" : message}
}