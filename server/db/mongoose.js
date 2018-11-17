const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp').then((res) => {
    console.log('Mongoose connected successfully')
}, (err) => {
    console.log('Mongoose failed to connect', err);
});

module.exports = {
    mongoose
};