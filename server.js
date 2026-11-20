import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const pets = [
    { id: 1, name: "Biscuit", type: "dog", age: 3 },
    { id: 2, name: "Whiskers", type: "cat", age: 5 },
    { id: 3, name: "Nemo", type: "fish", age: 1 },
    { id: 4, name: "Rex", type: "dog", age: 7 }
];
let nextPetId = 5;

const songs = [
    { id: 1, name: "So Into You", artist: "Tamia", year: 1998 },
    { id: 2, name: "Sexy Love", artist: "Ne-yo", year: 2006 },
    { id: 3, name: "Valerie", artist: "Amy Winehouse", year: 2006 },
    { id: 4, name: "Electric Feel", artist: "MGMT", year: 2007 },
    { id: 5, name: "Gots Ta Be", artist: "B2k", year: 2002 },
    { id: 6, name: "Too Little, Too Late", artist: "Jojo", year: 2006 }
];
let nextSongId = 7;

const movies = [
    { id: 1, title: "Waiting to Exhale", director: "Forest Whitaker", year: 1995 },
    { id: 2, title: "Love Jones", director: "Theodore Witcher", year: 1997 },
    { id: 3, title: "Love & Basketball", director: "Spike Lee", year: 2000 }
];
let nextMovieId = 4;

app.get("/", (req, res) => {
    res.send("Hello from my first server");
});

app.get("/favorite-food", (req, res) => {
    res.send("My favorite food is Sierra Leonean food");
});

app.get("/pets", (req, res) => {
    const type = req.query.type;
    if (type) {
        const filtered = pets.filter((pet) => pet.type === type);
        return res.json(filtered);
    }
    res.json(pets);
});

app.get("/pets/:id", (req, res) => {
    const id = Number(req.params.id);
    const pet = pets.find((item) => item.id === id);

    if (!pet) {
        return res.status(404).json({ error: "Pet not found" });
    }

    res.json(pet);
});

app.post("/pets", (req, res) => {
    const { name, type, age } = req.body ?? {};

    if (typeof name !== "string" || typeof type !== "string" || !name || !type) {
        return res.status(400).json({ error: "name and type are required" });
    }

    const newPet = { id: nextPetId++, name, type, age };
    pets.push(newPet);
    res.status(201).json(newPet);
});

app.put("/pets/:id", (req, res) => {
    const id = Number(req.params.id);
    const pet = pets.find((item) => item.id === id);

    if (!pet) {
        return res.status(404).json({ error: "Pet not found" });
    }

    const { name, type, age } = req.body ?? {};

    if (!name || !type) {
        return res.status(400).json({ error: "name and type are required" });
    }

    pet.name = name;
    pet.type = type;
    pet.age = age;

    res.json(pet);
});

app.delete("/pets/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = pets.findIndex((pet) => pet.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Pet not found" });
    }

    const deletedPet = pets.splice(index, 1)[0];
    res.json(deletedPet);
});

app.get("/api", (req, res) => {
    res.json({ message: "Welcome to my API", version: 1 });
});

app.get("/hello", (req, res) => {
    res.send("Hello, Vicrina");
});

app.get("/api/me", (req, res) => {
    res.json({ message: "Name: Vicrina", city: "Columbus", favoriteFood: "Sierra Leonean food" });
});

app.get("/songs", (req, res) => {
    const year = req.query.year;
    if (year) {
        const filtered = songs.filter((song) => song.year === Number(year));
        return res.json(filtered);
    }
    res.json(songs);
});

app.get("/songs/count", (req, res) => {
    res.json({ count: songs.length });
});

app.get("/songs/:id", (req, res) => {
    const id = Number(req.params.id);
    const song = songs.find((item) => item.id === id);

    if (!song) {
        return res.status(404).json({ error: "Song not found" });
    }
    res.json(song);
});

app.post("/songs", (req, res) => {
    const { name, artist, year } = req.body ?? {};

    if (!name) {
        return res.status(400).json({ error: "name not provided" });
    }

    if (typeof name !== "string" || typeof artist !== "string") {
        return res.status(400).json({ error: "Validation Error" });
    }

    const newSong = {
        id: nextSongId++,
        name,
        artist,
        year
    };
    songs.push(newSong);
    res.status(201).json(newSong);
});

app.put("/songs/:id", (req, res) => {
    const id = Number(req.params.id);
    const song = songs.find((item) => item.id === id);

    if (!song) {
        return res.status(404).json({ error: "Song not found" });
    }

    const { name, artist, year } = req.body ?? {};

    if (!name || !artist) {
        return res.status(400).json({ error: "name and artist are required" });
    }

    song.name = name;
    song.artist = artist;
    song.year = year;

    res.json(song);
});

app.delete("/songs/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = songs.findIndex((song) => song.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Song not found" });
    }

    const deletedSong = songs.splice(index, 1)[0];
    res.json(deletedSong)
});

app.get("/movies", (req, res) => {
    res.json(movies);
});

app.post("/movies", (req, res) => {
    const { title, director, year } = req.body ?? {};

    if (!title) {
        return res.status(400).json({ error: "title not provided" });
    }

    if (typeof title !== "string" || typeof director !== "string") {
        return res.status(400).json({ error: "Validation Error" });
    }

    const newMovie = {
        id: nextMovieId++,
        title,
        director,
        year
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});