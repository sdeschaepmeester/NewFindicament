
const pool = require('../db');

let Drug = {}

Drug.getDrugs = ()=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select id,code_cip,name From medicament2 Limit 10 ',(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

Drug.getDrugsByFilter = (symptom,name)=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From medicament2 Where symptome = ? && name like ? ',[symptom,'%'+name+'%'],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

Drug.getDrugById = (id)=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From medicament2 Where code_cip = ? ',id,(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}


module.exports =  Drug