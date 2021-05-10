
const pool = require('../db');

let favorite = {}

favorite.deleteFavorite = (id = -1)=> {
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

favorite.insertFavorite = (id_drug,name)=> {

    return new Promise((resolve,reject)=>{
        pool.query('Insert INTO history (id_drug, `name`) Values(?,?) ',[id_drug,name],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })


}

module.exports =  favorite