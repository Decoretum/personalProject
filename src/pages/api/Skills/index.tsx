import connection from "@/api/database";

export default function achievements(req: any, res: any) {
  const { method } = req;
  if (method === "GET") {
    connection.query(`SELECT * FROM Skills`, (error, results, fields) => {
      return res.status(200).json({ results: results });
    });
  } else if (method === 'POST'){
    const {name, description} = req.body;
    let value = [name, description];
    let query = 
      `INSERT INTO Skills(name, description)
      VALUES (?, ?)
      `
    connection.query(query, value, (err : any, result : any) => {
      if (err){
        return console.error(err);
      }
      return res.json({results: 'success'})
    })

    
  }
}