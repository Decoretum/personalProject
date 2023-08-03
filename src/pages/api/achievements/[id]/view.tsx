import connection from "@/api/database";

export default function view(req:any, res:any){
    const {method} = req;
    if (method === 'GET'){
        const { query } = req;
        const digit = Number(query.id);

        const value = [digit];
        const query1 = `SELECT * FROM Achievements 
        WHERE id = ?`
 
        connection.query(query1, value, (err, result) => {
            if (err) return console.error(err);
            return res.status(200).json({result : result})
        })
        
    }
    
    
}