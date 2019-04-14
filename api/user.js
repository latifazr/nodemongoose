var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var User = require('../models/userSchema');
var Todo = require('../models/todoSchema');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
var passport = require('passport');

router.post('/addUser', function (req, res) {
    motpass = req.body.password;
    var hash = bcrypt.hashSync(motpass, saltRounds);
    req.body.password = hash;
    var user = new User(req.body);
    user.save(function (err, User) {
        if (err) {
            res.send(err);
        }
        res.send(User);
    })
});


router.post('/login', function (req, res) {
    var email = req.body.email;
    User.findOne({ email: email }).exec((err, users) => {
        if (err) {
            res.send(err);
        }
        if (!users) {
            res.send('wrong email')
        }
        if (bcrypt.compareSync(req.body.password, users.password)) {
            let token = jwt.sign({data: users},"HS384",{ expiresIn: '3600'});
            res.send({
                success: true,
                message: 'Authentication successful!',
                access_token: token
            });
        } else {
            res.send('wrong password')
        }
    })
});

router.post('/affectTodo/:id/:idTodo', function (req, res) {
    var id = req.params.id;
    var todo= new Todo();
    todo['_id']= req.params.idTodo;
    User.findByIdAndUpdate({ _id: id },{$push:{Todo:todo}}).exec((err, users) => {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });
})

router.get('/getUser/:id',passport.authenticate('bearer', { session: false }), function (req, res) {
    var id = req.params.id;
    User.findById(id).populate('Todo').exec((err, users) => {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });
});











module.exports = router;