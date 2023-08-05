import connection from "@/api/database";

export default function achievements(req: any, res: any) {
  const { method } = req;
  if (method === "GET") {
    connection.query(`SELECT * FROM Achievements`, (error, results, fields) => {
      return res.status(200).json({ results: results });
    });
  } else if (method === 'POST'){
    const {title, description, duration} = req.body;
    let value = [title, description, duration];
    let query = 
      `INSERT INTO Achievements(title, description, duration)
      VALUES (?, ?, ?)
      `
    connection.query(query, value, (err : any, result : any) => {
      if (err){
        return console.error(err);
      }
      return res.json({results: 'success'})
    })

    
  }
}
