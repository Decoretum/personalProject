import connection from "@/api/database";

export default function Delete(req: any, res: any){
    const {body, params, method, query} = req;
    if (method === 'DELETE'){
        let query = `DELETE FROM Achievements
        WHERE id = ?`
        let value = [body.id]
        connection.query(query, value, (err, result) => {
            if (err) return console.error(err);
            return res.status(200).json({'result' : 'success'})
        })
    }
    
}