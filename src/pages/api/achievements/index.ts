import connection from "@/api/database";

export default function achievements(req: any, res: any) {
  const { method } = req;
  if (method === "GET") {
    connection.query(`SELECT * FROM Achievements`, (error, results, fields) => {
      return res.status(200).json({ results: results });
    });
  } else if (method === 'POST'){
    const {title, description, duration, skill} = req.body;
    const skillArray = skill.filter((element : string) => {
      return element !== '' && element !== undefined
    })

    //Associative Entity Creation
    let value = [title, description, duration]
    let query = 
      `INSERT INTO Achievements(title, description, duration)
      VALUES (?, ?, ?)
      ` 
    connection.query(query, value, (err : any, result : any) => {
      let achID = result.insertId;
      if (err){
        return console.error(err);
      }

      for (let i of skillArray){

        let skillName = [i]
        let queryID = `
        SELECT id FROM Skills
        WHERE name = (?) 
        `
        connection.query(queryID, skillName, (err : any, result : any) => {
          console.log(result[0].id)
          if (err) return console.error(err);
          
          let value = [achID, Number(result[0].id)];
          let query = `
          INSERT INTO AchSkills (aID, sID)
          VALUES (?, ?)
          `
            connection.query(query, value, (err : any, result : any) => {
              if (err) return console.error(err);
            } )
        })      
        }

        return res.status(200).json({result: 'success'})
    })



    
  }
}
