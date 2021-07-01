
const pool = require('../db');

let favorite = {}

favorite.getFavorite = (offset)=> {
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM favorite GROUP BY code_cip ORDER BY id ASC limit 8 OFFSET ?  ',[offset],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}
favorite.CheckIfExist = (cip)=> {
    return new Promise((resolve,reject)=>{
        pool.query('Select count(distinct(code_cip)) as nb From favorite where code_cip = ? ',cip,(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

favorite.deleteFavorite = (id = -1)=> {
    if(id == -1){ // delete All
        return new Promise((resolve,reject)=>{
            pool.query('Delete From favorite ',(err,result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result[0])
            })
        })
    }else{
        return new Promise((resolve,reject)=>{
            pool.query('Delete From favorite Where code_cip = ?',id,(err,result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result[0])
            })
        })
    }

}

favorite.insertFavorite = (cip,name)=> {

    return new Promise((resolve,reject)=>{
        pool.query('Insert INTO favorite (code_cip, `name`) Values(?,?) ',[cip,name],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })


}

module.exports =  favorite