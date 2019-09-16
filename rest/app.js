const {success, error} = require("./assets/functions")

const bodyParser = require("body-parser");
const express = require("express");

const morgan = require('morgan'); //Middleware permettant de loguer les requêtes SQL
const config = require("./assets/config");

const mysql = require("mysql");

var connection = mysql.createConnection({
    host    :   config.database.host,
    port    :   config.database.port,
    database:   config.database.name,
    user    :   config.database.user,
    pass    :   config.database.pass
});

connection.connect(null, (err) => {

    if(err) {
        console.log(err);
        return;
    }

    console.log("Connected on thread #" + connection.threadId);

    const app = express();

    let membersRouter = express.Router();
    let Members = require("./assets/classes/members")(connection, config);

    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));




    membersRouter.route("/:id")

        .get((req, res) => {

            connection.query("SELECT * FROM members WHERE id = ?",  [req.params.id], (err, result) => {
                if(err) {
                    res.json(error(err.message));
                    return;
                }

                res.json(success(result[0]));
            });

        })




    membersRouter.route("/")

        .get((req, res) => {

            connection.query("SELECT * FROM members", (err, result) => {
                if(err) {
                    res.json(error(err.message));
                    return;
                }

                res.json(success(result));
            });
        })

        .post((req, res) => {

            if(req.body.name) {

                connection.query("INSERT INTO members (name) VALUES(?)", [req.body.name], (err, results) => {
                    if(err) {
                        res.json(error(err.message));
                        return
                    }

                    res.json(success(results));
                })


            } else {
                res.json(error("Request need 'name' parameter"));
            }
        });


    app.use(config.rootUrl + "members", membersRouter);
    app.listen(config.port, () => console.log("Started on port " + config.port));


});



