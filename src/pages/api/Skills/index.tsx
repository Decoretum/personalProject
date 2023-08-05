import connection from "@/api/database";

export default function achievements(req: any, res: any) {
  const { method } = req;
  const choices = ['tech','personal','household','document','communication','gaming']
  if (method === "GET") {
    connection.query(`SELECT * FROM Skills`, (error, results, fields) => {
      return res.status(200).json({ results: results, choices: choices });
    });
  } else if (method === 'POST'){
    const {name, description, category} = req.body;
    let value = [name, description, category];
    let query = 
      `INSERT INTO Skills(name, description, category)
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