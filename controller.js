/**
 * Created by SergeyShestopalov on 08.08.2017.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
mongoose.Promise = require('./node_modules/bluebird');
var db = mongoose.connect("mongodb://localhost:27017/Users");
var User = require('./db/models/user.js');

exports.createUser = function (userData) {
    var user = {
        username: userData.username,
        email: userData.email,
        password: hash(userData.password)
    };
    return new User(user).save();
};
exports.getUser = function (id) {
    return User.findOne(id);
};
exports.checkUser = function (userData) {
    return User
        .findOne({email: userData.email}) //ищет по емейлу
        .then(function (doc) {
            if(doc.password == hash(userData.password)){ //проверка пароля
                console.log('User password is ok');
                return Promise.resolve(doc); //возращает положительный промис
            }else {
                console.log("dfs1");
                return Promise.reject("Error wrong"); //если нет совпадений с паролем
            }
        })
        .catch(function () {
            console.log("dfs2");
            return Promise.reject("Error wrong");
        })
};

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}
