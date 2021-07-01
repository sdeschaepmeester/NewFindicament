
const pool = require('../db');

let Planning = {}

Planning.getPlanning = ()=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select * From planning',(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

Planning.insertPlanning = (name, comment, start_date)=> {

    return new Promise((resolve,reject)=>{
        pool.query('Insert INTO planning (`name`,`comment`, `start_date`) Values(?,?,?) ',[name,comment,start_date],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })


}

module.exports =  Planning