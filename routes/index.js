var express = require('express');
var router = express.Router();
var api = require('../controller');

router.get('/', function(req, res, next) {
    if(req.session.user){
        var data = {
            title: 'Express',
            user : req.session.user
        };
        res.render('login', data);
    } else {
        var data = {
            title: 'Express'
        };
        res.sendStatus(400);
        res.render('index', data);
    }
});
router.get('/users', function(req, res, next) {
    if(req.session.user){
        var data = {
            title: 'Express',
            user : req.session.user
        };
        res.render('login', data);
    } else {
        var data = {
            title: 'Express'
        };
        res.render('index', data);
    }
});
module.exports = router;