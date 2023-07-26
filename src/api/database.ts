import mysql from 'mysql'
import fs from 'fs';
let password = '';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: fs.readFileSync(process.cwd() + '/src/api/password.txt','utf-8'),
    database: 'PORTFOLIO'
});
connection.connect()
export default connection;