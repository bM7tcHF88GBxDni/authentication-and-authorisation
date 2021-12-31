import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("<h1>This is the main route.</h1>");
})

app.listen(PORT, ()=> {
    console.log(`Express is listening on http://localhost:${PORT}/`);
});