import mysql, { Connection, MysqlError } from 'mysql';

const db: Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'account'
});

db.connect((err: MysqlError) => {
    if (err) {
        console.error('### FAILED TO CONNECT MYSQL DB ###', err);
        return;
    }

    console.log('DB Connection established. Connection ID:', db.threadId);
});

function queryPromise(sql: string, values: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (error: any, result: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    });
};

export { queryPromise };
export default db;
