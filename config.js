export const pgConnection = {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
}

export const auth = {
    privateKey: process.env.JWT_PRIVATE_KEY
}