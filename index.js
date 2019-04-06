const express = require('express')
let app = express()
const bodyparser = require('body-parser')
let mhs = require('./controller/mahasiswa')
app.use(bodyparser.urlencoded({extended : true}))

let data = [
    {
        nim: "1301180023",
        nama:"annisa",
        kelas : "if-42-08"
    },
    {
        nim : "1301180024",
        nama : "selum",
        kelas : "if- 42 09"
    }
]

app.get('/mahasiswa',mhs.getmhs)
// app.get('/',(req,res)=>{
//     res.send('halaman root')
// })

app.post('/mahasiswa',(req,res,next)=>{
    if(req.body.nim) {
        next()
    }
    else {
        res.send('maaf nim tidak ada')
    }
})

app.get('/mahasiswa',mhs.getmhs)
app.get('/mahasiswa:index',mhs.getmhs1)
app.post('/mahasiswa',mhs.stroremhs)
app.put('/mahasiswa:index',mhs.updatemhs)
app.delete('/mahasiswa:index',mhs.deletemhs)

app.use((req,res,next)=>{
    if(req.body.nim) {
        next()
    }
    else {
        res.send('maaf nim tidak ada')
    }
})
app.get('/mahasiswa/',(req,res)=>{
    res.send(data)
})

app.post('/mahasiswa/',(req,res)=>{
    let mahasiswa = {
        nim : req.body.nim,
        nama : req.body.nama,
        kelas : req.body.kelas
    }
data.splice(data.length, 1 , mahasiswa);
res.send(data)
console.log("insert user berhasil")
})

app.put('/mahasiswa:index',(req,res)=>{
    let update_mhs = {
        nim : req.body.nim,
        nama : req.body.nama,
        kelas : req.body.kelas
    }
        data.splice(req.params.index,1, update_mhs)
        res.send(data)
})

app.delete('/mahasiswa/:index',(req,res)=>{
    data.splice(req.params.index,1)
    res.send(data)
})


app.listen(3000)