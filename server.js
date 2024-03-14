const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Parse JSON bodies
app.use(bodyParser.json());

// In-memory database to store issues
let issues = {
    1: { title: 'Initial Issue', description: 'This is a sample issue.' }
};

// Routes

// Retrieve all issues
app.get('/issues', (req, res) => {
    res.json(issues);
});

// Retrieve a specific issue by its ID
app.get('/issues/:id', (req, res) => {
    const id = req.params.id;
    if (issues[id]) {
        res.json(issues[id]);
    } else {
        res.sendStatus(404);
    }
});

// Create a new issue
app.post('/issues', (req, res) => {
    const issue = req.body;
    const newId = Object.keys(issues).length + 1;
    issues[newId] = issue;
    res.status(201).json(issue);
});

// Update an existing issue
app.put('/issues/:id', (req, res) => {
    const id = req.params.id;
    issues[id] = req.body;
    res.json(issues[id]);
});

// Delete an issue
app.delete('/issues/:id', (req, res) => {
    const id = req.params.id;
    if (issues[id]) {
        delete issues[id];
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});