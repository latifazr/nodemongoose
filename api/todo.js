//method 1 
var express = require('express');
var router = express.Router();
//method 2 
//var router = require('express').Router();

var Todo = require('../models/todoSchema');
router.post('/addTodo', function (req, res) {
    var todo = new Todo(req.body);
    todo.save(function (err, todo) {
        if (err) {
            res.send(err);
        }
        res.send(todo);
    })
});

router.get('/allTodos', function (req, res) {
    Todo.find().exec((err, todos) => {
        if (err) {
            console.log(err);
        }
        res.send(todos);
    })
});


router.get('/getid/:id', function (req, res) {
    var id = req.params.id;
    /*models.Foo*/Todo.findById(id).lean().exec((err, todos) => {
        if (err) {
            console.log(err);
        }
        res.send(todos);
    })
});

router.delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    Todo.findByIdAndRemove(id).exec((err, todos) =>{
        if (err) {
            console.log(err);
        }
        res.send(todos);
    });
});

router.put('/update/:id', function (req, res) {
    var id = req.params.id;
    Todo.findByIdAndUpdate({_id : id},{$set: req.body}).exec((err, todos) =>{
        if (err) {
            console.log(err);
        }
        res.send(todos);
    })
});


module.exports = router;


