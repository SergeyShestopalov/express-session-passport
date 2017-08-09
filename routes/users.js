var express = require('express');
var router = express.Router();
var api = require('../controller');
var mongoose = require('mongoose');
mongoose.Promise = require('../node_modules/bluebird');
/* Post users login. */
router.post('/login', function(req, res, next) { //отправление данный с клиента на /login
 /*   if (!req.body.username || !req.body.password){
        //return res.sendStatus(400); // пароль или логин не введен
    } else {*/

        if(req.session.user) {
            console.log('da');
            return res.redirect('/');
        } // если сессия существует, то перенаправляет на /

          api.checkUser(req.body) //проверка на существоевание в бд, и создание сессии (передача тела http-запроса)
              .then(function (user) { //ждет результат проверки (промис)
                  if(user){
                    req.session.user = {id: user._id, username: user.username}; // сохраняет новую сессию
                    console.log('da');
                      res.redirect('/'); //перенаправляет на /
                  }else {
                      console.log('da1');
                      return res.sendStatus(500);
                  }
              })
              .catch(function (error) {
                  console.log('da2');
                  return res.sendStatus(500);
              })
   /* }*/
});
router.post('/', function (req, res, next) { //Crud операции над юзером
    api.createUser(req.body) //создание нового пользователя (преедача тела запроса)
        .then(function (result) { //жждет результата создания
            console.log("User created"); //успешное создание
            res.sendStatus(201);
        })
        .catch(function (err) {
            if (err.toJSON().code == 11000){ //ошибка при создании (юзер уже существует в бд)
              res.status(500).send("This email already exist");
            }
        })
});
router.post('/logout', function (req, res, nest) { //выход
    if(req.session.user){ //проверка на существование сессии
        console.log(req.session.id);
        delete req.session.user; //удаление сессии
        res.redirect('/'); //перенаправлене на /
    }else {
        res.sendStatus(400);
    }
});
router.get('/logout', function (req, res, nest) { //выход
    if(req.session.user){ //проверка на существование сессии
        console.log(req.session.id);
        delete req.session.user; //удаление сессии
        res.redirect('/users'); //перенаправлене на /
    }else {
        res.sendStatus(400);
    }
});
module.exports = router;
