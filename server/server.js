const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, './../public');
const port = process.env.PORT || 3000;

app.use('/', express.static(publicPath));

app.listen(port, () => {
    console.log(`Server started up at ${port}`);
});
// console.log(__dirname + './../public');
// console.log(path.join(__dirname, './../public'));