const app = require('express').Router();
const Teacher = require('../index').models.Teacher;
const Class = require('../index').models.Class;
const conn = require('../conn');

app.get('/', (req, res, next) => {
    Class.findAll()
        .then(result => {
            console.log('result', result)
            res.send(result)
        })
});

module.exports = app;
