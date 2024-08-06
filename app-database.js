const http  = require('http') // modul bawaan dari node.js
const mysql = require('mysql2') // modul dari node_modules

// konfigurasi database mysql yg ingin digunakan
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database',
})

// menyambungkan atau membuka koneksi
db.connect()


// ambil data dari mysql
db.query("SELECT * FROM karyawan", function(error, hasil) {
    if (error) {
        console.log(error);
    } else {
        console.log(hasil)
        console.log('=========')
        console.log(hasil[1].nama)
        console.log('=========')
        for (let i=0; i < hasil.length; i++) {
            console.log(hasil[i].nama)
        }
    }
})

db.end()