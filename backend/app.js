const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: "posts added successfully"
    });
});

app.get('/api/posts', (req, res, next) => {
    console.log('middleware');
    const posts = [
        {
            id: "1",
            title: "Rishabh",
            content: "Jaiswal"
        },
        {
            id: "2",
            title: "Yog",
            content: "Negi"
        },
        {
            id: "3",
            title: "Akshay",
            content: "Both"
        }
    ]
    res.status(200).json({
        message: "Successfull",
        posts: posts
    })
});

module.exports = app;