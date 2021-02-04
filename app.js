const express         = require('express');
const bodyParser      = require('body-parser');
const mysqlConnection = require('./connection');
const app             = express();
const PORT            = process.env.PORT || 3000;
const cors            = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let usersRoutes   = require("./routes/users");
let companyRoutes   = require("./routes/companies");

app.get('/get',(req,res)=>{
    res.send("hey");
})

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("content-type", "application/json; charset=utf-8")
    next();
  });

app.use('/',usersRoutes);
app.use('/company',companyRoutes);

app.listen(PORT,()=>{
    console.log( `connnected at port ${PORT}`);
})