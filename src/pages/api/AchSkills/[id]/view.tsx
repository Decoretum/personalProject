import connection from "@/api/database";

export default async function view(req:any, res:any){
    const {method} = req;
    if (method === 'GET'){
        const { query } = req;
        const digit = Number(query.id);

        const value = [digit];
        
        //Returns Associative entity rows with corresponding name
        // connection.query(query1, value, (err : any, result : any) => {
        //     if (err) return console.error(err);
        //     let rows = result;
        //     while (i < rows.length){
        //         let sID = result[i].sID;
        //         let query = `SELECT name, category from Skills WHERE id = ?`
        //         connection.query(query, [sID], (err, result) => {
        //             dataMap.set(result[0].category, result[0].name)
        //             if(dataMap.size === rows.length){
        //                 const objectify = Object.fromEntries(dataMap.entries())
        //                 return res.status(200).json(objectify)
        //             }
        //         })
        //         i++
        //     }
             
        // })
        let q = `SELECT AchSkills.id as AchID, Skills.id, Skills.name, Skills.category
        FROM Skills, AchSkills
        WHERE Skills.id = AchSkills.sID
        AND AchSkills.aID = ?
        `
        let v = [value]
        connection.query(q, v, (err, result) => {
            if (err) return console.error(err);
            return res.status(200).json(result);
        })
        
    }
}