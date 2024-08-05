const http = require('http')


let server = http.createServer( function(request, respon) {
    let nama = 'Aji Kowiyu'
    let alamat = 'Pluit, Jakarta Utara, 14440'
    let html = `<h1>Hai, nama saya ${nama}, saya tinggal di ${alamat}</h1>`
    console.log(nama)
    respon.writeHead(200, {'Content-type': 'text/html'})
    respon.end(html)
})


server.listen(3000, function() {
    console.log('Server sudah siap, buka http://localhost:3000');
})