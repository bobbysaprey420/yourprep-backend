const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConnection = require('../connection');
let cors = require('cors')
router.use(cors());


router.get('/amazon',(req,res)=>{
        let sql = "SELECT * FROM questions JOIN answers ON questions.ans_id=answers.id where questions.company='amazon' order by questions.year desc, questions.college"
        mysqlConnection.query(sql,(err,result)=>{
            if(err){
                res.status(202).send(err);
            }
            else{
                res.status(200).send(result);
            }
        }); 
    });

router.get('/mathworks',(req,res)=>{
    let sql = "SELECT * FROM questions JOIN answers ON questions.ans_id=answers.id where questions.company='mathworks' order by questions.year desc, questions.college"
    mysqlConnection.query(sql,(err,result)=>{
        if(err){
            res.status(202).send(err);
        }
        else{
            res.status(200).send(result);
        }
    }); 
});

router.get('/cisco',(req,res)=>{
    let sql = "SELECT * FROM questions JOIN answers ON questions.ans_id=answers.id where questions.company='cisco' order by questions.year desc, questions.college"
    mysqlConnection.query(sql,(err,result)=>{
        if(err){
            res.status(202).send(err);
        }
        else{
            res.status(200).send(result);
        }
    }); 
});

module.exports = router;