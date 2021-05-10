
const pool = require('../db');

let History = {}

History.getHistory = ()=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From history',(err,result)=>{
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
            pool.query('Delete From history Where cip = ?',id,(err,result)=>{
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
        pool.query('Insert INTO history (cip, `name`) Values(?,?) ',[cip,name],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })


}

module.exports =  History