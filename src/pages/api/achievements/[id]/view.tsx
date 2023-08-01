import connection from "@/api/database";

export default function View(req, res){
    const { query } = req;
    const digit = query.id;

    const value = [digit];
    const query1 = `SELECT * FROM Achievements 
    WHERE id = ?`

    connection.query(query1, value, (err, result) => {
        if (err) return console.error(err);
        return res.status(200).json(result)
    })
}