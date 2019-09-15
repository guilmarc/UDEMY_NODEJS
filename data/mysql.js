
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