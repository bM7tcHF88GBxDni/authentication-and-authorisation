import express from "express";

import { createUser, validateRegisterInput, getAllUsers, validateLoginInput, checkUserExists } from "./models/users.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
    res.send("<h1>This is the main route.</h1>");
})

app.get("/users", async (req, res) => {
    const data = await getAllUsers();

    if (data.length === 0) {
        res.json({
            success: true,
            payload: "No records in table."
        });
        return;
    }

    res.json({
        success: true,
        payload: data
    })
})

app.post("/login", async (req, res) => {
    //validate input
    const valid = validateLoginInput(req.query);
    if (!valid) {
        res.json({
            success: false,
            payload: "One or more input fields are missing data."
        });
        return;
    }

    //check user exists
    const exists = await checkUserExists(req.query);
    if (!exists) {
        res.json({
            success: true,
            payload: "User does not exist."
        });
        return;
    }

    //compare passwords
});

app.post("/register", async (req, res) => {

    const valid = validateRegisterInput(req.query);
    if (!valid) {
        res.json({
            success: false,
            payload: "One or more input fields are missing data."
        });
        return;
    };

    //add user
    res.json({
        success: true,
        payload: await createUser(req.query)
    });
})

app.listen(PORT, ()=> {
    console.log(`Express is listening on http://localhost:${PORT}/`);
});