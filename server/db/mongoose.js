const mongoose = require('mongoose');
import config from '../config.js'

mongoose.Promise = Promise;
mongoose.connect(`mongodb://${config.db.username}:${config.db.pass}@ds057000.mlab.com:57000/als-todo-app`).then((res) => {
    console.log('Mongoose connected successfully')
}, (err) => {
    console.log('Mongoose failed to connect', err);
});

module.exports = {
    mongoose
}