import connection from "@/api/database";

export default function achievements(req: any, res: any) {
  const { method } = req;
  if (method === "GET") {
    connection.query(`SELECT * FROM Achievements`, (error, results, fields) => {
      res.status(200).json({ results: results });
    });
  }
}
