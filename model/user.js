var mongoose = require('../db/database').mongoose;

const User = mongoose.model('user', {
    username: String,
    password: String
});

const select = (userInfo, func) => {
    User.findOne(userInfo).then((result) => {
        func(result);
    });
};
const save = (userInfo, func) => {
    const user = new User(userInfo);
    user.save().then((result) => {
        func(result);
    });
};
module.exports = {
    select,
    save
};