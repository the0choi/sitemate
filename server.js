const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Parse JSON bodies
app.use(bodyParser.json());

let issues = {
    1: { title: 'Initial Issue', description: 'This is a sample issue.' }
};

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});