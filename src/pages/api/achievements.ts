import connection from "@/api/database";

export default function achievements(req: any, res: any) {
  const { method } = req;
  if (method === "GET") {
    connection.query(`SELECT * FROM Achievements`, (error, results, fields) => {
      return res.status(200).json({ results: results });
    });
  } else if (method === 'POST'){
    const {title, Description} = req.body;
    let value = [title, Description];
    let query = 
      `INSERT INTO Achievements(title, description)
      VALUES (?, ?)
      `
    connection.query(query, value, (err, result) => {
      if (err){
        return console.error(err);
      }
      return res.json({results: 'success'})
    })

    
  }
}
