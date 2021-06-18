const history = require('../server/Model/HistoryModel')// calling file with sql method


describe('Test to db',()=>{

    beforeAll(()=>{

    })

    test('demo somme', ()=>{
        const a = 2+2;
        expect(a).toBe(4);
    })

    it('delete history', async ()=>{
        let array_before_delete  = await history.countHistory()
        let before = parseInt(array_before_delete[0].id)
        await history.deleteHistory(before)
        let array_after_delete  = await history.countHistory()
        let after = parseInt(array_after_delete[0].id)+1

        await history.insertHistory("test"+array_after_delete,"test")


        console.log("before")
        console.log(before)
        console.log("after ")
        console.log(after)
        expect(before).toBe(after);
    })


})


describe('Inscription requirement',()=>{

    beforeAll(()=>{

    })

    test('demo somme', ()=>{
        const a = 2+2;
        expect(a).toBe(4);
    })

    it('minimum size', async ()=>{
        let array_before_delete  = await history.countHistory()
        let before = parseInt(array_before_delete[0].id)
        await history.deleteHistory(before)
        let array_after_delete  = await history.countHistory()
        let after = parseInt(array_after_delete[0].id)+1

        await history.insertHistory("test"+array_after_delete,"test")


        console.log("before")
        console.log(before)
        console.log("after ")
        console.log(after)
        expect(before).toBe(after);
    })


})

