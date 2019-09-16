const {success, error, checkAndChange} = require("./assets/functions")

const bodyParser = require("body-parser");
const express = require("express");

const morgan = require('morgan'); //Middleware permettant de loguer les requêtes SQL
const config = require("./assets/config");

const mysql = require("promise-mysql");

mysql.createConnection({
    host    :   config.database.host,
    port    :   config.database.port,
    database:   config.database.name,
    user    :   config.database.user,
    pass    :   config.database.pass

}).then(connection => {

    console.log("Connected on thread #" + connection.threadId);

    const app = express();

    let membersRouter = express.Router();
    let Members = require("./assets/classes/members")(connection, config);

    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));




    membersRouter.route("/:id")

        .get(async (req, res) => {
            let member = await Members.getByID(req.params.id);
            res.json( checkAndChange(member) );
        });


    membersRouter.route("/")

        .get(async (req, res) => {
            let members = await Members.getAll(req.query.max);
            res.json( checkAndChange(members) );
        })

        .post(async (req, res) => {
            let response = await Members.add(req.body.name);
            res.json( checkAndChange(response) );
        });


    app.use(config.rootUrl + "members", membersRouter);
    app.listen(config.port, () => console.log("Started on port " + config.port));
}).catch((err) => {
   console.log(err.message);
});



