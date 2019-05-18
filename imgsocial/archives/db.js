const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/imgsocial', {
    useNewUrlParser: true
})
    .then(db => console.log('Connected'))
    .catch(err => console.log(err));