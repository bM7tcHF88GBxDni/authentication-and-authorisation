// id (unique), 
// first_name, 
// last_name, 
// email (unique), 
// password, 
// token (string)

import { query } from "../index.js";

async function createUsersTable() {
    //sql
    const sql = `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT UNIQUE, password TEXT, token TEXT);`
    //query
    const response = await query(sql);
    console.log("createUsersTable: ", response);
}

createUsersTable();