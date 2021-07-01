
const pool = require('../db');

let favorite = {}

favorite.getFavorite = (offset,id_user)=> {

    console.log("id_user")
    console.log(id_user)

    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM favorite Where id_user = ? GROUP BY code_cip ORDER BY id ASC limit 8 OFFSET ?  ',[id_user,offset],(err,result)=>{
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

favorite.deleteFavorite = (id = -1,id_user)=> {
    if(id == -1){ // delete All
        return new Promise((resolve,reject)=>{
            pool.query('Delete From favorite Where id_user = ? ',id_user,(err,result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result[0])
            })
        })
    }else{
        return new Promise((resolve,reject)=>{
            pool.query('Delete From favorite Where code_cip = ? AND id_user = ? ',[id,id_user],(err,result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result[0])
            })
        })
    }

}

favorite.insertFavorite = (cip,name,id_user)=> {

    return new Promise((resolve,reject)=>{
        pool.query('Insert INTO favorite (code_cip, `name`,id_user) Values(?,?,?) ',[cip,name,id_user],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })


}

module.exports =  favorite