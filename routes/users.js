const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const mysqlConnection = require('../connection');
const jwt = require("jsonwebtoken");
let cors = require('cors')
router.use(cors());
const secret = 'your-prep';


router.post('/signup',(req,res)=>{
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password = req.body.password;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hashed) => {
            password=hashed;
            let value = [[first_name, last_name, email, password]];
            let sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES ?'
            mysqlConnection.query(sql,[value],(err,result)=>{
                if(err){
                    // console.log(err);
                    // console.log(err);
                    // console.log(res.headers);
                    res.status(202).send(err);
                }
                else{
                    // console.log(result);
                    // console.log(res);
                    res.status(200).send(result);
                }
            });
        });
    });   
});

router.post('/login',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let sql = 'SELECT * FROM users WHERE email ='+ mysql.escape(email);
    mysqlConnection.query(sql,(err,result)=>{
        if(result.length==0){
            res.send("user not exist");
        }
        else if(err){
            res.status(500).send({ error: 'Error in fetching a user data' })
        }
        else{
            bcrypt.compare(password, result[0].password, (err, isMatch) => {
                if (err) console.log(err);
                if (isMatch) {
                  let name=result[0].first_name+' '+result[0].last_name;
                  let token = jwt.sign({id: result[0].id,name:name},secret, {expiresIn: '2h'});
                  res.send({token});
                }
                else{
                  return res.send("Unauthorized");
                }
            });
        }
    });
});

module.exports = router;