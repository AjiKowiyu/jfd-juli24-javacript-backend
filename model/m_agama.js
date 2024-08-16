const mysql     = require('mysql2')
const db        = require('../config/database').db
const eksekusi  = require('../config/database').eksekusi

module.exports =
{
    get_semuaAgama: function () {
        return eksekusi( mysql.format(
            "SELECT * FROM agama"
        ))
    }
}