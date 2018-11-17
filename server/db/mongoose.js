const mongoose = require('mongoose');
// const config = require('../../config.json');

mongoose.Promise = Promise;
mongoose.connect(`mongodb://alsade:Alaba1616@ds057000.mlab.com:57000/als-todo-app`, {
    useNewUrlParser: true
}).then((res) => {
    console.log('Mongoose connected successfully')
}, (err) => {
    console.log('Mongoose failed to connect', err);
});

module.exports = {
    mongoose
}