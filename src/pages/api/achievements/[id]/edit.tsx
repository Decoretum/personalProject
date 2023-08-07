import connection from "@/api/database";

export default function Edit(req: any, res: any){
    const {method, body, query} = req;
    const {title, Description, Duration, AchID, skillsID, skills} = body;
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
            //while (i < )
            for (let skillName of skills){
                let v2 = [skillName, id]
                let q2 = 
                `
                    UPDATE AchSkills, Skills
                    SET AchSkills.sID = Skills.id
                    WHERE Skills.name = ?
                    AND Skills.I
                `
                connection.query(q2, v2, (error, result) => {
                    if (error) return console.error(error);
                })
            }
            return res.status(200).json({result: 'success'})

        })


        
        
    }
}