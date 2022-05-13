const express = require('express');
const db = require('../config/db');
const router = express.Router();



router.post('/login', async (req, res) => {
    let email = req.body.email
    let pass = req.body.pass

    db.query('call SEL_USER(?, ?)', [email, pass], (err, result) => {
        if(err) throw err

        res.status(200).send(result[0])

    })

})


router.post('/register', async (req, res) => {
    let email = req.body.email
    let pass = req.body.pass
    let nick = req.body.nick

    db.query('call INS_USER(?, ?, ?)', [email, pass, nick], (err, result) => {
        if(err) throw err

        res.status(200).send(result[0])

    })

})





module.exports = router;