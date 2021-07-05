const pool = require('../db');

let Drug = {}

Drug.getDrugsPaginate = (offset)=> {
    return new Promise((resolve,reject)=>{
        pool.query('SELECT id,code_cip,name FROM medicament2 ORDER BY id ASC limit 8 OFFSET ? ',[offset],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}
Drug.getDrugs = ()=> {
    return new Promise((resolve,reject)=>{
        pool.query('SELECT id,code_cip,name FROM medicament2 ORDER BY id ASC limit 1 ',(err,result)=>{
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
Drug.searchDrugByName = (name)=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From medicament2 Where  name like ? ','%'+name+'%',(err,result)=>{
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