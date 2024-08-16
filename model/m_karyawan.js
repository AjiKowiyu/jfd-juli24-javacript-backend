const mysql     = require('mysql2')
const db        = require('../config/database').db
const eksekusi  = require('../config/database').eksekusi

module.exports = 
{


    get_semuaKaryawan: function () {
        return eksekusi( mysql.format(
            "SELECT * FROM karyawan"
        ))
    },


    get_satuKaryawan: function (idk) {
        return eksekusi( mysql.format(
            `SELECT
                karyawan.*,
                departemen.kode AS kode_dept, departemen.nama AS nama_dept,
                agama.nama AS nama_agama
            FROM karyawan
            LEFT JOIN departemen    ON departemen.id = karyawan.departemen_id
            LEFT JOIN agama         ON agama.id = karyawan.agama_id
            WHERE karyawan.id = ?`,
            [idk]
        ))
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

        return eksekusi( mysql.format(
            `INSERT INTO karyawan SET ?`,
            [data]
        ))
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

        return eksekusi( mysql.format(
            `UPDATE karyawan SET ? WHERE id = ?`,
            [data, idk]
        ))
    },



    hapus_satuKaryawan: function (idk) {
        return eksekusi( mysql.format(
            `DELETE FROM karyawan WHERE id = ?`,
            [idk]
        ))
    },

}
