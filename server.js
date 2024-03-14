const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Parse JSON bodies
app.use(bodyParser.json());

let issues = {
    1: { title: 'Initial Issue', description: 'This is a sample issue.' }
};

// Routes
app.get('/issues', (req, res) => {
    res.json(issues);
});

app.get('/issues/:id', (req, res) => {
    const id = req.params.id;
    if (issues[id]) {
        res.json(issues[id]);
    } else {
        res.sendStatus(404);
    }
});

app.post('/issues', (req, res) => {
    const issue = req.body;
    const newId = Object.keys(issues).length + 1;
    issues[newId] = issue;
    res.status(201).json(issue);
});

app.put('/issues/:id', (req, res) => {
    const id = req.params.id;
    issues[id] = req.body;
    res.json(issues[id]);
});

app.delete('/issues/:id', (req, res) => {
    const id = req.params.id;
    if (issues[id]) {
        delete issues[id];
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});