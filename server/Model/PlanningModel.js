
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

Planning.insertPlanning = (name, comment)=> {

    return new Promise((resolve,reject)=>{
        pool.query('Insert INTO planning (`name`,`comment`) Values(?,?) ',[name,comment],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })


}

module.exports =  Planning