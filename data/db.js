import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const dbConnection = mysql.createPool(dbConfig);

dbConnection.getConnection()
    .then(connection => {
        console.log('Connessione a MySQL (Promise Pool) avvenuta con successo!');
        connection.release();
    })
    .catch(error => {
        console.error('ERRORE FATALE: Impossibile connettersi al database!', error);
        process.exit(1);
    });

export default dbConnection;
