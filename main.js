const express = require("express");
const app =  express();
const jwt = require('jsonwebtoken');
const CONF = require("./config/conf");
//const connectControl = require("./Controller/ConnexionController.js");
const User = require("./TestComponent/Mongoose/user");
const bodyParser = require('body-parser');
const {checkoutFactory} = require('./TestComponent/LinkController');
class Main
{
    constructor() {

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', "*");
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);

            next();
        });

        /*app.use("/v1/", function () {
           console.log("home");
        });
*//*
        app.use(function(req, res, next) {
            let token = req.body.token || req.query.token || req.headers['x-access-token'];
            console.log(token);
            if (token) {
                jwt.verify(token, CONF.secret, function(err, decoded) {
                    if (err) {
                        return res.json({ success: false, message: 'Failed to authenticate token.' });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });

            }
        });
*/
        app.post(CONF.APIURL+'auth/register', (req, res) => {
            this.render('connexion', 'register', req, res);
            res.sendfile('./public/Views/Index.html');
        });

        app.post(CONF.APIURL+'auth/login', (req, res) => {
            console.log("ok2");
            this.render('connexion', 'login', req, res);
            res.sendfile('./public/Views/home.html');

        });

        app.post(CONF.APIURL+'auth/logout', (req, res) => {
            console.log("ok3");
            let result = this.render('connexion', 'logout', req, res);


        });

        app.post(CONF.APIURL+'service/buy', (req, res) => {
            console.log("ok3");
            let result = this.render('service', 'buy', req, res);


        });

        app.get(CONF.APIURL+'user/:pseudo/profile', (req, res) => {
            this.render('user', 'profile', req, res);
        });

        app.get('/',function(req, res) {
            res.sendFile(__dirname+'/public/Views/Index.html');
        });

        app.get('/v1/app/home', function(req,res) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Hello ' + req.params.name + '!'}));
        });

        app.get('/register',function(req, res) {
            res.sendFile(__dirname+'/public/Views/register.html');
        });

        app.listen(8080, () => {
            console.log('Listening at http://localhost:8080');
        });

    }

    async render (c, m, req, res)
    {
        const result = await checkoutFactory.init(c, m, req);
        res.status(result.statusCode);
        console.log(result.statusCode);
        console.log(result);

        res.send(result);
    }
}


new Main();
module.exports = app;
