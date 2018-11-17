const mongoose = require('mongoose');
const config = require('config.json');

mongoose.Promise = Promise;
mongoose.connect(`mongodb://${config.db.username}:${config.db.pass}@ds057000.mlab.com:57000/als-todo-app`).then((res) => {
    console.log('Mongoose connected successfully')
}, (err) => {
    console.log('Mongoose failed to connect', err);
});

module.exports = {
    mongoose
};