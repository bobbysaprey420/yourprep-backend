const mysql = require('mysql');

const db = mysql.createConnection({
    host:'freedb.tech',
    user:'freedbtech_yourprep',
    password:'yourprep',
    database:'freedbtech_yourprep'
});

db.connect((err)=>{
    if(err)
        throw err;
    console.log('db connected');
})

module.exports = db;