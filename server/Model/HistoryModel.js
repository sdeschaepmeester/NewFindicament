
const pool = require('../db');

let History = {}

History.getHistory = (offset,id_user)=> {
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM history Where id_user = ? GROUP BY code_cip ORDER BY id ASC limit 8 OFFSET ? ',[id_user,offset],(err,result)=>{
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




History.deleteHistory = (id = -1,id_user)=> {
    if(id == -1){ // delete All
        return new Promise((resolve,reject)=>{
            pool.query('Delete From history where id_user = ?',id_user,(err,result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result[0])
            })
        })
    }else{
        return new Promise((resolve,reject)=>{
            pool.query('Delete From history Where code_cip = ? AND id_user = ?',[id,id_user],(err,result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result[0])
            })
        })
    }

}



History.insertHistory = (cip,name,id_user)=> {
    console.log("user_id 3")
    console.log(id_user)
    return new Promise((resolve,reject)=>{
        pool.query('Insert INTO history (code_cip, `name`,id_user) Values(?,?,?) ',[cip,name,id_user],(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result[0])
        })
    })


}

module.exports =  History