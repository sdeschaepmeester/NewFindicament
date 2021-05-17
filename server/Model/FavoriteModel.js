
const pool = require('../db');

let favorite = {}

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
            pool.query('Delete From favorite Where cip = ?',id,(err,result)=>{
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
        pool.query('Insert INTO favorite (cip, `name`) Values(?,?) ',[cip,name],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })


}

module.exports =  favorite