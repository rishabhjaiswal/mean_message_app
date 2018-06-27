const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://admin:7LVbz2OWUD1NAwHH@cluster0-sz2jz.mongodb.net/node-angular?retryWrites=true")
.then(() => {
    console.log("Connected to server properly");
})
.catch(() => {
    console.log("error occured");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();

    console.log(post);
    res.status(201).json({
        message: "posts added successfully"
    });
});

app.get('/api/posts', (req, res, next) => {
    console.log('middleware');
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: "Successfull",
                posts: documents
            });
        });
    
});

module.exports = app;