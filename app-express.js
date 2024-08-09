const express   = require('express')
const app       = express()
const port      = 3000


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


app.listen(port, function() {
    console.log('Server sudah siap, buka http://localhost:'+port)
})