const db = require('../config/database').db

module.exports =
{
    get_semuaDepartemen: function() {
        return new Promise( (resolve,reject)=>{
            db.query("SELECT * FROM departemen", function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    }
}