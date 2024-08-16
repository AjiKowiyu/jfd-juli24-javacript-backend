const db = require('../config/database').db

module.exports = 
{


    get_semuaKaryawan: function () {
        return new Promise( (resolve,reject)=>{
            db.query("SELECT * FROM karyawan", function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },


    get_satuKaryawan: function (idk) {
        let sql = 
        `SELECT
            karyawan.*,
            departemen.kode AS kode_dept, departemen.nama AS nama_dept,
            agama.nama AS nama_agama
        FROM karyawan
        LEFT JOIN departemen    ON departemen.id = karyawan.departemen_id
        LEFT JOIN agama         ON agama.id = karyawan.agama_id
        WHERE karyawan.id = ?`;

        return new Promise( (resolve,reject)=>{
            db.query(sql, [idk], function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },



    insert_karyawan: function (req) {
        let data = {
            nama            : req.body.form_nama_lengkap,
            gender          : req.body.form_gender,
            alamat          : req.body.form_alamat,
            nip             : req.body.form_nip,
            departemen_id   : req.body.form_departemen,
            agama_id        : req.body.form_agama
        }
        let sql = `INSERT INTO karyawan SET ?`;

        return new Promise( (resolve,reject)=>{
            db.query(sql, [data], function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },



    update_karyawan: function (req, idk) {
        let data = {
            nama            : req.body.form_nama_lengkap,
            gender          : req.body.form_gender,
            alamat          : req.body.form_alamat,
            nip             : req.body.form_nip,
            departemen_id   : req.body.form_departemen,
            agama_id        : req.body.form_agama
        }
        let sql = `UPDATE karyawan SET ? WHERE id = ?`;

        return new Promise( (resolve,reject)=>{
            db.query(sql, [data, idk], function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },



    hapus_satuKaryawan: function (idk) {
        let sql = 
        `DELETE FROM karyawan
        WHERE id = ?`;

        return new Promise( (resolve,reject)=>{
            db.query(sql, [idk], function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

}
