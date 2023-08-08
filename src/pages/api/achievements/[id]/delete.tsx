import connection from "@/api/database";

export default function Delete(req: any, res: any){
    const {body, params, method, query} = req;
    if (method === 'DELETE'){
        //Delete Associative Entities first
        let v1 = [body.id];
        let q1 = 
        `
            DELETE FROM AchSkills
            WHERE aID = ?
        `
        connection.query(q1, v1, (error, result) => {
            if (error) return console.error(error);

            //now delete the achievement itself
            let query = `DELETE FROM Achievements
            WHERE id = ?`
            let value = [body.id]
            connection.query(query, value, (err : any, result : any) => {
                if (err) return console.error(err);
                return res.status(200).json({'result' : 'success'})
        })


        })

        
    }
    
}