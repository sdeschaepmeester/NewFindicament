const mysql = require("mysql")

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

module.exports = medicaDb