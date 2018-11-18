const _ = require('lodash');
const express = require('express');
const bodyParse = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} =require('./db/mongoose');
var {Todo} =require('./models/todo');
var {User} =require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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
    let todos = Todo.find().then((todos) => {

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

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Not a valid id');
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            res.status(404).send()
        }
        res.status(200).send(todo);
    }).catch((e) => {
        res.status(400).send();
    })
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Not a valid id');
    }

        if(_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
})
app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
});