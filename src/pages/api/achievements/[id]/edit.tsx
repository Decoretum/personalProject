import connection from "@/api/database";

export default function Edit(req: any, res: any){
    const {method, body, query} = req;
    const {title, Description, Duration, AchID, skills} = body;
    const id = query.id;

    if (method === 'PUT'){
        // return console.log(body)
        const q1 = 
        `
            UPDATE Achievements
            SET title = ?, description = ?, Duration = ?
            WHERE id = ?
        `
        const v1 = [title, Description, Duration, id]
        connection.query(q1, v1, (error, result) => {
            if(error) return console.error(error);
            let i = 0;
            while (i < skills.length && i < AchID.length){
                let v2 = [Number(skills[i][0]), AchID[i], id]
                let q2 = 
                `
                    UPDATE AchSkills, Skills
                    SET AchSkills.sID = ?
                    WHERE AchSkills.id = ? 
                    AND AchSkills.aID = ?
                `
                connection.query(q2, v2, (error, result) => {
                    if (error) return console.error(error);
                })
                i += 1;
            } 
            
            //There will be additional associative entities
            while (i >= AchID.length && i < skills.length){
                let v3 = [id, Number(skills[i][0])];
                let q3 = 
                `
                    INSERT INTO AchSkills (aID, sID)
                    VALUES (?, ?)
                `
                connection.query(q3, v3, (error, result) => {
                    if (error) return console.error(error);
                })
                i += 1;
            } 
            
            //Certain number of associative entities will be removed
            while (i >= skills.length && i < AchID.length) {
                let v4 = [AchID[i]];
                let q4 = 
                `
                 DELETE FROM AchSkills
                 WHERE id = ?
                `
                connection.query(q4, v4, (error, result) => {
                    if (error) return console.error(error);
                })
                i += 1;
            } 


            return res.status(200).json({result: 'success'})
            
            

        })


        
        
    }
}