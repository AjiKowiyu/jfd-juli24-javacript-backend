const http  = require('http')
const fs    = require('fs')
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database',
})

db.connect()



let server = http.createServer( function(request, respon) {
    if (request.url == '/') {
        respon.writeHead(200, {'Content-type': 'text/html'})
        fs.createReadStream('./view/beranda.html').pipe(respon)
    }
    else if (request.url == '/karyawan') {
        respon.writeHead(200, {'Content-type': 'text/html'})
        // proses pengambilan data dari mysql
        db.query("SELECT * FROM karyawan", function(error, hasil) {
            if (error) {
                console.log(error);
            } else {
                // buat variabel kosong
                let datakry = ''
                for (let i=0; i < hasil.length; i++) {
                    // isi variabel kosong dengan loopingan data dari db
                    datakry += hasil[i].nama + ' - ' +hasil[i].gender + '<br>'
                }
                // kirim ke frontend menggunakan respon manual
                // karena fs.createReadStream tidak mampu menerima kiriman data dari backend
                respon.write(
                    `<h1>Berita terupdate dari kami:</h1><hr>
                    ${datakry}`
                )
            }
        })
    }
    else {
        respon.writeHead(200, {'Content-type': 'text/html'})
        fs.createReadStream('./view/error404.html').pipe(respon)
    }
})



server.listen(3000, function() {
    console.log('Server sudah siap, buka http://localhost:3000');
})