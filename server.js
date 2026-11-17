import express from "express";

const app = express() This creates server
const PORT = 3000;

app.get("/",(req,res) =>{
res.send("Hello from my first server")
})

app.get("favorite-food" ,(req, res) =>{
    res.send("My favorite food is Sierra Leonean food")
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})