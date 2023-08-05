import connection from "@/api/database";

export default function Delete(req: any, res: any){
    const {body, params, method, query} = req;
    if (method === 'DELETE'){
        let query = `DELETE FROM Skills
        WHERE id = ?`
        let value = [body.id]
        connection.query(query, value, (err : any, result : any) => {
            if (err) return console.error(err);
            return res.status(200).json({'result' : 'success'})
        })
    }
    
}