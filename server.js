const express = require("express");
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');


const app = express();
const path = require("path");

app.use(express.static('web'));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/index.html'));
});


app.post('/api/comment', function (req, res) {
    let comment = req.body;
    let commentFile = jsonfile.readFileSync("./server/comment.json");
    commentFile.comments.push(comment);
    jsonfile.writeFileSync("./server/comment.json",commentFile);
});

app.listen(7777);