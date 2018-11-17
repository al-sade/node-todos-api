const express = require('express');
const bodyParse = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} =require('./db/mongoose');
var {Todo} =require('./models/todo');
var {User} =require('./models/user');

var app = express();

app.use(bodyParse.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
});


app.get('/todos', (req, res) => {
    let todos = Todo.find().then((todso) => {

        res.send(todos);
        return todos;
    }, err => {
        res.status(400).send(err);
    })
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Not a valid id');
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send('not todo found')
        }
        res.send({todo})
    }).catch((err) => {
        return res.status(400).send('400')
    })

});

app.listen(3000, () => {
    console.log('Server is running');
});