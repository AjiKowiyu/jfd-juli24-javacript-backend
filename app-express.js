const express   = require('express')
const app       = express()
const port      = 3000
const mysql     = require('mysql2')
const db        = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database',
})
db.connect()


app.set('view engine','ejs')    //setting penggunaan template engine untuk express
app.set('views', './view-ejs')  //setting penggunaan folder untuk menyimpan file .ejs


app.get('/', function(req,res) {
    res.send('<h1>Hello World !!</h1>')
})


app.get('/hubungi', function(req,res) {
    let data = {
        nomor_wa: '081293260970',
        email: 'ajikowiyu@gmail.com',
        linkedin: '@ajikowiyu',
    }
    res.render('hubungi', data)
})


app.get('/profil', function(req,res) {
    let data = {
        jabatan: 'Senior Manager',
        gender: 'Laki',
        gaji: 7000000,
    }
    res.render('profil-developer', data)
})



// buat function terpisah untuk
// proses pengambilan data dari mysql
function get_semuaKaryawan() {
    return new Promise( (resolve,reject)=>{
        db.query("SELECT * FROM karyawan", function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}


// gunakan async await, untuk memaksa node js
// menunggu script yg dipanggil sampai selesai di ekseskusi
app.get('/karyawan', async function(req,res) {
    let dataview = {
        karyawan: await get_semuaKaryawan()
    }
    res.render('karyawan/index', dataview)
})



app.get('/karyawan/detail/:id_karyawan', async function(req,res) {

    // ambil id yang dikirim via url
    let idk = req.params.id_karyawan

    // setelah itu kirim ke proses request data mysql
    let dataview = {
        pegawai: await get_satuKaryawan(idk),
    }
    res.render('karyawan/detail', dataview)
})


function get_satuKaryawan(idk) {
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
}


app.get('/karyawan/hapus/:id_karyawan', async function(req,res) {
    // ambil id yang dikirim via url
    let idk = req.params.id_karyawan

    // proses hapus data
    try {
        let hapus = await hapus_satuKaryawan(idk)
        if (hapus.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }
})


function hapus_satuKaryawan(idk) {
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
}



app.listen(port, function() {
    console.log('Server sudah siap, buka http://localhost:'+port)
})