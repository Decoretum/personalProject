import connection from "@/api/database";

export default function Edit(req: any, res: any){
    const {method, body, query} = req;
    const title = body.title;
    const description = body.Description;
    const id = query.id;
    if (method === 'PUT'){
        const query = `
        UPDATE Achievements
        SET title = ?, description = ?
        WHERE id = ?
        `
        const value = [title, description, id]
        connection.query(query, value, (err, result) => {
            if (err) return console.error(err);
            return res.status(200).json({result})
        })
        
    }
}