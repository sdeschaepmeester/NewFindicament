
const pool = require('../db');
const bcrypt = require('bcrypt');

let Auth = {}

Auth.all = ()=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From user',(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

Auth.one = (id)=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From user Where id = ?',[id],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })
}
Auth.getByEmail = (email)=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From user Where email = ? Limit 1',email,(err,result)=>{
            if(err){
                return reject(err)
            }
            console.log(resolve(result[0]))
            return resolve(result[0])
        })
    })
}

Auth.insert = (email,password)=> {
    return new Promise((resolve,reject)=>{
        pool.query('Insert INTO user (email, password) Values(?,?) ',[email,password],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })
}

Auth.updateUser = (name,id)=> {
    return new Promise((resolve,reject)=>{
        pool.query('Update user Set  name = ? Where id = ?',[name,id],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })
}

Auth.comparePassword = async (password, inputPassword) => {
    console.log("the password "+password)
    let compare = await bcrypt.compare(inputPassword,password)
    console.log("the password are the same ? "+compare)

    return compare;
}


function comparePassword (passwordDB,passwordInput){
    return bcrypt.compareSync(passwordInput, passwordDB);
}

module.exports =  Auth