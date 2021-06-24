
const pool = require('../db');

let History = {}

History.getHistory = ()=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From history Group by code_cip ',(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

History.countHistory = ()=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select count(id) as id From history',(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}




History.deleteHistory = (id = -1)=> {
    if(id == -1){ // delete All
        return new Promise((resolve,reject)=>{
            pool.query('Delete From history ',(err,result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result[0])
            })
        })
    }else{
        return new Promise((resolve,reject)=>{
            pool.query('Delete From history Where code_cip = ?',id,(err,result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result[0])
            })
        })
    }

}



History.insertHistory = (cip,name)=> {

    return new Promise((resolve,reject)=>{
        pool.query('Insert INTO history (code_cip, `name`) Values(?,?) ',[cip,name],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })


}

module.exports =  History