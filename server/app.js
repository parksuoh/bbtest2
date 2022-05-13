
const cors = require('cors')
const express = require('express')
const app = express()
const path = require("path");

const db = require('./config/db')

const PORT = 4000

const bodyParser = require('body-parser')

const fileupload = require("express-fileupload")
app.use(fileupload())



app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(express.static(__dirname));
app.use(cors({ origin: true, credentials: true }));

app.use('/uploads', express.static('uploads'));

app.use('/api/user', require('./router/user'));


app.post('/upload', (req, res) => {

    let dateNow = Date.now()

    if(req.files === null){
      return res.status(400).json({msg:'no file uploaded'});
    }
    const file = req.files.file;

    file.mv(`${__dirname}/uploads/${dateNow}_${file.name}`, err => {
      if(err) throw err

      let newFileUrl = `http://211.169.248.225:${PORT}/uploads/${dateNow}_${file.name}`

      db.query("UPDATE TB_USER  SET  IMAGE = ?, EDTDATE=NOW() WHERE UID = ?", [newFileUrl, parseInt(req.headers.uid)], (err, result) => {
        if(err) throw err

        db.query("SELECT * FROM TB_USER WHERE UID = ?", [parseInt(req.headers.uid)], (err, result) => {
          if(err) throw err

          res.status(200).send(result[0])

        })

      })

    });
  });


app.listen(PORT, () => console.log(`연결됨 ${PORT}`))