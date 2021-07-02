const history = require('../server/Model/HistoryModel')// calling file with sql method

describe('Insertion to db',()=>{

    beforeAll(()=>{

    })

    it('delete in history', async ()=>{
        let array_before_delete  = await history.countHistory()
        let before = parseInt(array_before_delete[0].id)
        await history.deleteHistory("test"+array_before_delete)
        let array_after_delete  = await history.countHistory()
        let after = parseInt(array_after_delete[0].id)

        await history.insertHistory("test"+array_after_delete,"test")
        expect(before).toBeGreaterThan(after);
    })

    it('insert in history', async ()=>{
        let array_before_insert  = await history.countHistory()
        let before = parseInt(array_before_insert[0].id)
        await history.insertHistory("test"+array_before_insert,"test")
        let array_after_insert  = await history.countHistory()
        let after = parseInt(array_after_insert[0].id)
        await history.deleteHistory("test"+array_before_insert)

        expect(before).toBe(after-1);
    })


})


describe('Inscription-requirement',()=>{

    let first_password = "azZeazes_ss5";
    let last_password = "azZeazes_s";
    let requiredLength = 8
    let minExcepted = 1

    beforeAll(()=>{

    })

    it('checkLength',()=>{
        let pass_length =  first_password.length >= requiredLength ? true : false;
        expect(first_password.length).toBeGreaterThanOrEqual(requiredLength);
        expect(pass_length).toBeTruthy();

    })
    it('checkIfSame',()=>{
        expect(first_password && first_password === last_password).toBeTruthy()

    })
    it('checkIfNumber',()=>{
        let number = ""
        for (let i = 0; i < first_password.length; i++) {
            if(/\d/.test(first_password[i])){
                number= parseInt(first_password[i])
            }
        }
        expect(typeof number).toBe('number')

    })
    it('checkIfCaps',()=>{
        let caps = ""
        for (let i = 0; i < first_password.length; i++) {
            if(first_password[i].toUpperCase() === first_password[i]){
                caps= first_password[i]
            }
        }
        expect(caps).toHaveLength(minExcepted);

    })
    it('checkIfLower',()=>{
        let lower = ""
        for (let i = 0; i < first_password.length; i++) {
            if(first_password[i].toLowerCase() === first_password[i]){
                lower= first_password[i]
            }
        }
        expect(lower).toHaveLength(minExcepted);


    })
    it('checkSpecialChar',()=>{
        let specialChar = ""
        for (let i = 0; i < first_password.length; i++) {
            if(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(first_password[i])){
                specialChar= first_password[i]
            }
        }
        expect(specialChar).toHaveLength(minExcepted);

    })




})

