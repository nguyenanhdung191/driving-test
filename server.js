const express = require("express");
const app = express();
const path = require("path");
app.use(express.static('web'));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/index.html'));
});

app.listen(8888);