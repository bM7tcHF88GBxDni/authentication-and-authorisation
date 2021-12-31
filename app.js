import express from "express";
import res from "express/lib/response";

import { validateRegisterInput } from "./models/users.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
    res.send("<h1>This is the main route.</h1>");
})

app.post("/register", async () => {
    const data = req.query;
    console.log("req.query", data);

    const valid = validateRegisterInput(req.query);
    if (!valid) {
        res.json({
            success: false,
            payload: "One or more input fields are missing data."
        });
    }

    //add user

})

app.listen(PORT, ()=> {
    console.log(`Express is listening on http://localhost:${PORT}/`);
});