const mysql = require("mysql")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

const pool = mysql.createPool({
    connectionLimit: 10,
    password : "",
    user: "root",
    database: "medica",
    host: "localhost",
    port : "3306"
})



let medicaDb = {}

medicaDb.all = ()=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From user',(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

medicaDb.one = (id)=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From user Where id = ?',[id],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })
}
medicaDb.getByEmail = (email)=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From user Where email = ? Limit 1',[email],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })
}

medicaDb.getDrugs = ()=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From medicament  ',(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

medicaDb.insert = (email,password)=> {
    return new Promise((resolve,reject)=>{
        pool.query('Insert INTO user (email, password) Values(?,?) ',[email,password],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })
}

medicaDb.comparePassword = async (password, inputPassword) => {
    console.log("hello"+password)
    let compare = await bcrypt.compare(inputPassword,password)
    return compare;
}


function comparePassword (passwordDB,passwordInput){
    return bcrypt.compareSync(passwordInput, passwordDB);
}

module.exports = medicaDb