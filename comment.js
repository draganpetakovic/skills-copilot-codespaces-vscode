// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/comment', (req, res) => {
    
    fs.readFile('comment.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/comment', (req, res) => {
    fs.readFile('comment.json', 'utf8', (err, data) => {
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comment.json', JSON.stringify(comments), (err) => {
            res.send('success');
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});