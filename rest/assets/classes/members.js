let database, config;


module.exports = (_database, _config) => {
    database = _database;
    config = _config;
    return Members;
};

let Members = class {

    static getByID(id) {

        return new Promise( next => {

            database.query("SELECT * FROM members WHERE id = ?", [id])
                .then( (result) => {
                    if (result[0] !== undefined) {
                        next(result[0])
                    }
                    else {
                        next(new Error("Not found"))
                    }
                } )
                .catch( err => next(err) )
        } )
    }

    static getAll(max) {

        return new Promise (next => {

            if(max !== undefined && max > 0)
                database.query("SELECT * FROM members LIMIT 0, ?", [parseInt(max)])
                    .then(result => next(result))
                    .catch(err => next(err));
            else {
                database.query("SELECT * FROM members")
                    .then(result => next(result))
                    .catch(err => next(err));
            }

        })
    }

    static add(name) {

        return new Promise (next => {

            if(name) {

                database.query("INSERT INTO members (name) VALUES(?)", [name])
                    .then(result => next(result))
                    .catch(err => next(err));
            } else {
                next( new Error("[name] is empty"));
            }

        })

    }

    static update(id, name) {

        return new Promise ( next => {

            if(id && name) {
                database.query("UPDATE members SET name = ? WHERE id = ?", [name, id])
                    .then(result => next(result))
                    .catch(err => next(err))
            } else {
                next(new Error("Missing value [id, name]"))
            }

        })

    }

}