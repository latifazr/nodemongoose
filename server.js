var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database/db');
var todoCrud = require('./api/todo');
var userCrud = require('./api/user');
var passport = require('./passport/passport');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/todos',todoCrud);
app.use('/users',userCrud);

app.listen(3001);