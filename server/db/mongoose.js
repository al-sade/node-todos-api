const mongoose = require('mongoose');
const config = require('../../config.json');

mongoose.Promise = Promise;
mongoose.connect(`mongodb://localhost:27017/TodoApp`, {
    useNewUrlParser: true
}).then((res) => {
    console.log('Mongoose connected successfully')
}, (err) => {
    console.log('Mongoose failed to connect', err);
});

module.exports = {
    mongoose
};