const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/movies', (req, res) => {
    res.json({
        data: [
            {
                id: 1,
                slug: "1",
                title: "Inception",
                year: 2018,
                author: "Roar Uthaug",
                duration: 125,
                genre: "Action, Fantasy",
                synopsis: "Un voleur s'infiltre dans les rêves pour dérober des secrets.",
                cover: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
                rating: 3.5
            },
            {
                id: 2,
                slug: "2",
                title: "The Dark Knight",
                year: 2018,
                author: "Roar Uthaug",
                duration: 125,
                genre: "Action, Fantasy",
                synopsis: "Batman affronte le Joker pour sauver Gotham.",
                cover: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                rating: 5
            },
            {
                id: 3,
                slug: "3",
                title: "Interstellar",
                year: 2018,
                author: "Roar Uthaug",
                duration: 125,
                genre: "Action, Fantasy",
                synopsis: "Une équipe voyage à travers un trou de ver pour sauver l'humanité.",
                cover: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                rating: 4
            }
        ]
    });
});


app.post('/login', (req, res) => {
    const user = req.body;

    if (!user.email || !user.password) {
        res.status(400).send({});
    }

    if (user.email === 'thomas.ciles2025@campus-eni.fr' && user.password === 'test') {
        const token = jwt.sign({ email: user.email }, JWT_SECRET)

        return res.json({ data: {
            email: user.email,
            token
        }});
    }

    res.status(400).send({});
});

app.use((req, res, next) => {
    res.status(404)
    res.json({error: 'Page Not Found'});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
