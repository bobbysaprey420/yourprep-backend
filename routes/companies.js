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


router.get('/amazon',(req,res)=>{
        let sql = "SELECT * FROM questions JOIN answers ON questions.ans_id=answers.id where questions.company='amazon' order by questions.year desc"
        mysqlConnection.query(sql,(err,result)=>{
            if(err){
                res.status(202).send(err);
            }
            else{
                res.status(200).send(result);
            }
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