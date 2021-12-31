import express from "express";

import { query } from "./database/index.js";

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
    //testing db connection
    // const test = await query(`SELECT COUNT(*)
    // FROM INFORMATION_SCHEMA.TABLES;`);
    // console.log(test); 
    res.send("<h1>This is the main route.</h1>");
})

app.listen(PORT, ()=> {
    console.log(`Express is listening on http://localhost:${PORT}/`);
});