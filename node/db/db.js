import { Sequelize } from 'sequelize';
import { DB_PORT , DB_NAME , DB_PASSWORD , DB_HOST , DB_USER } from '../config/config.js';

const db = new Sequelize(DB_NAME , DB_USER , DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
})

export default db;