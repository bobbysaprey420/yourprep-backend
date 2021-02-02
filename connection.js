const mysql = require('mysql');

const db = mysql.createConnection({
    host:'remotemysql.com',
    user:'zryDWUkEGt',
    password:'cAJiVUt0ai',
    database:'zryDWUkEGt'
});

db.connect((err)=>{
    if(err)
        throw err;
    console.log('db connected');
})

module.exports = db;