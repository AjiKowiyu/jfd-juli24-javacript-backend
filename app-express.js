const express   = require('express')
const app       = express()
const port      = 3000


app.get('/', function(req,res) {
    res.send('<h1>Hello World !!</h1>')
})

//route -> rute
app.get('/hubungi', function(req,res) {
    res.send('<h1>Silakan Wa: 081293260970</h1>')
})


app.listen(port, function() {
    console.log('Server sudah siap, buka http://localhost:'+port)
})