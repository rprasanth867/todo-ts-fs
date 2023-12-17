const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todos'
});

db.connect((err: any) => {
    if (err) {
        console.log('### FAILED TO CONNECT MYSQL DB ###', err);
        return;
    }

    console.log('DB Connection established. Connection ID:', db.threadId);
});

function queryPromise(sql: string, values: any[] = []) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (error: any, result: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(result)
            }
        })
    })
};

module.exports = db;
module.exports.queryPromise = queryPromise;
