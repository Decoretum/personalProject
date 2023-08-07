import connection from "@/api/database";

export default function Edit(req: any, res: any){
    const {method, body, query} = req;
    const {title, Description, Duration, AchID, skills} = body;
    const id = query.id;

    if (method === 'PUT'){
        return console.log(body)
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
            while (i < skills.length){
                let v2 = [skills[i][0], skills[i][0], skills[i][0], id, skills[i][1]]
                let q2 = 
                `
                    UPDATE AchSkills, Skills
                    SET AchSkills.sID = ?
                    WHERE Skills.id = ?
                    AND AchSkills.sID = ?
                    AND AchSkils.aID = ? 
                    AND Skills.name = ?
                `
                connection.query(q2, v2, (error, result) => {
                    if (error) return console.error(error);
                })
            }
            
            return res.status(200).json({result: 'success'})

        })


        
        
    }
}