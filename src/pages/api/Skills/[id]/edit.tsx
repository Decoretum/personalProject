import connection from "@/api/database";

export default function Edit(req: any, res: any){
    const {method, body, query} = req;
    const name = body.name;
    const description = body.description;
    const category = body.category;
    const id = query.id;
    if (method === 'PUT'){
        const query = `
        UPDATE Skills
        SET name = ?, description = ?, category = ?
        WHERE id = ?
        `
        const value = [name, description, category, id]
        connection.query(query, value, (err : any, result : any) => {
            if (err) return console.error(err);
            return res.status(200).json({result})
        })
        
    }
}