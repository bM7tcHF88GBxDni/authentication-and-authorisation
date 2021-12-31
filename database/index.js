//import query pool connection and expose it
import pg from "pg";

import { pgConnection } from "../config.js";

const pool = new pg.Pool({
    host: pgConnection.host,
    user: pgConnection.user,
    database: pgConnection.database,
    password: pgConnection.password,
    port: pgConnection.port,
    SSL: { rejectUnauthorized: false }
});

export function query(sql, values) {
    return pool.query(sql, values);
}