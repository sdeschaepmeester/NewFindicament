
const pool = require('../db');

let History = {}

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
            pool.query('Delete From history Where id_drug = ?',id,(err,result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result[0])
            })
        })
    }

}

History.getDrugById = (id)=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From history Where code_cip = ? ',id,(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

History.insertHistory = (id_drug,name)=> {

    return new Promise((resolve,reject)=>{
        pool.query('Insert INTO history (id_drug, `name`) Values(?,?) ',[id_drug,name],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })


}

module.exports =  History