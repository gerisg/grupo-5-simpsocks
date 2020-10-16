require('dotenv').config();

module.exports = {
    dbConfig: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: true,
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            timestamps: false,
            underscored: true
        }
    }        
}