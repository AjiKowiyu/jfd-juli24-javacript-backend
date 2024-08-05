const http = require('http')


let server = http.createServer( function(request, respon) {
    // mendeteksi status http 200 (user berhasil terkoneksi dengan aplikasi kita)
    // Content-type: apa tipe konten yg ingin diberikan ke user
    // text/plain itu akan menampilkan teks apa adanya
    // text/html akan merender tag html menjadi tampilan di browser
    respon.writeHead(200, {'Content-type': 'text/html'})
    // hasil akhir yg akan diberikan ke user
    respon.end('<h1>Halo Guys!, Aji disini mau review gadget</h1>')
})


server.listen(3000, function() {
    console.log('Server sudah siap, buka http://localhost:3000');
})