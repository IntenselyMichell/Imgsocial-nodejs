const express = require('express');
const multer = require('multer');
const uuid = require('uuid/v4');
const morgan = require('morgan');
const { format } = require('timeago.js');
const path = require('path');
var mongoose = require('mongoose');
var MongoSessionStore = require('session-mongoose')(require('connect'));
var sessionStore = new MongoSessionStore({
  url: config.mongoConnStr
});


var app = express();

app.use(express.static(__dirname + '/public'));
mongoose.connect(config.mongoConnStr, config.mongoOpts);
app.use(require('body-parser').urlencoded({
  extended: true
}));


const app = express();
require('./db');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    dest: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));

app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

app.use(require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log(`Port ${app.get('port')}`);
});
