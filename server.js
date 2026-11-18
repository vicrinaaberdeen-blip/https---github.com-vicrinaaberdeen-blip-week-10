import express from "express";

const app = express() 
const PORT = 3000;

const pets = [
    {id: 1, name: "Biscuit", type: "dog", age: 3},
    {id: 2, name: "Whiskers", type: "cat", age: 5},
    {id: 3, name: "Nemo", type: "fish", age: 1},
    {id: 4, name: "Rex", type: "dog", age: 7},
]

const songs = [
    {id: 1, name: "So Into You", artist: "Tamia", year: 1998},
    {id: 2, name: "Sexy Love", artist: "Ne-yo", year: 2006},
    {id: 3, name: "Valerie", artist: "Amy Winehouse", year: 2006},
    {id: 4, name: "Electric Feel", artist: "MGMT", year: 2007},
    {id: 5, name: "Gots Ta Be", artist: "B2k", year: 2002},
    {id: 6, name: "Too Little, Too Late", artist: "Jojo", year: 2006},
    
]


app.get("/",(req,res) =>{
res.send("Hello from my first server")
})

app.get("/favorite-food", (req, res) =>{
    res.send("My favorite food is Sierra Leonean food")
})

app.get("/pets",(req,res) =>{
    const type = req.query.type
    if(type) {
        const filtered = pets.filter((pet) => pet.type === type)
        return res.json(filtered)
    }
    res.json(pets)
})

app.get("/pets/:id", (req,res)=>{
    const id = Number(req.params.id)
    const pet = pets.find((pet)=> pet.id === id)

    if(!pet) {
        return res.status(404).json({error: "Pet not found"})
    }

    res.json(pet)
})

app.get("/api",(req, res) => {
    res.json({message: "Welcome to my API", version: 1})
})

app.get("/hello", (req,res) => {
    res.send("Hello, Vicrina")
})

app.get("/api/me",(req,res) => {
    res.json({message:"Name: Vicrina", city:"Columbus", favoriteFood:"Sierra Leonean food"})
})

app.get("/songs", (req, res)=>{
    const year = req.query.year
    if(year) {
        const filtered = songs.filter((song) => song.year === Number(year))
        return res.json(filtered)
    }
    res.json(songs)
})

// app.get("/pets",(req,res) =>{
//     const type = req.query.type
//     if(type) {
//         const filtered = pets.filter((pet) => pet.type === type)
//         return res.json(filtered)
//     }
//     res.json(pets)
// })

app.get("/songs/count", (req,res) =>{
    res.json({count: songs.length})
})

app.get("/songs/:id", (req,res) =>{
    const id = Number(req.params.id)
    const song = songs.find((song) => song.id === id)

    if(!song) {
        return res.status(404).json({error: "Song not found"})
    }
    res.json(song)
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})