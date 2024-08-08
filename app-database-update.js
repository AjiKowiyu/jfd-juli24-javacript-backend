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

let sql = 
`UPDATE karyawan
SET nama = 'prabowo'
WHERE id = 15`

// memasukkan/menambahkan data dari mysql
db.query(sql, function(error, hasil) {
    if (error) {
        console.log(error)
    } else {
        // console.log(hasil)
        if (hasil.affectedRows > 0) {
            console.log('berhasil update data karyawan')
        }
    }
})

db.end()