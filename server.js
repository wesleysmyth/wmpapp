require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const open = require('open');
const { seed, models } = require('./server/db/index.js');
const webpack =  require('webpack');
const config =  require('./webpack.config');
const compiler = webpack(config);
const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET || 'foo';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);

    models.Teacher.findOne({ id: jwt_payload.id })
    .then(user => {
        if (user) {
            next(null, user)
        } else {
            next(null, false)
        }
    })
});

passport.use(strategy);

const app = express();
app.use(passport.initialize());

app.use(require('webpack-hot-middleware')(compiler));
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    serverSideRender: true
}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'client/css')));

const publicRoutes = require('./server/api/public');
const teacherRoutes = require('./server/api/teacher');
const classRoutes = require('./server/api/class');
const resources = require('./server/api/resources');
const exchangeRoutes = require('./server/api/exchange');
const schoolRoutes = require('./server/api/school');

app.use('/public', publicRoutes);
app.use('/resources', resources);
app.use('/teacher', passport.authenticate('jwt', { session: false }), teacherRoutes);
app.use('/class', passport.authenticate('jwt', { session: false }), classRoutes);
app.use('/exchange', passport.authenticate('jwt', { session: false }), exchangeRoutes);
app.use('/school', passport.authenticate('jwt', { session: false }), schoolRoutes);


const { feedback, sendError } = require('./server/utils/feedback');

app.use(function (err, req, res, next) {
    console.log('err', err)
    let defaultError;
    if (err && err.defaultError) {
        defaultError = err.defaultError;
    } else {
        defaultError = "Something went wrong!"
    }
    return sendError(500, err, defaultError, res);

});

app.get('*', (req, res, next) => {
    return res.sendFile(path.join(__dirname, '/client/src/index.html'));
});

const port = process.env.PORT || 3000;

app.set('port', port);

app.listen(app.get('port'), () => console.log(`${port} is a beautiful port.`));

seed();
