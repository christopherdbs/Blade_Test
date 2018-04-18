const CONF = require("./../../config/conf");
const {Mongo} = require("./../Service/Mongo");
const User = require("./../Mongoose/user");
const {tokenManager} = require("./../Model/TokenManager");
const MongoClient = require("mongodb").MongoClient;
assert = require('assert');
//const req = require('mocha');
class ConnexionController {

    async registerAction(req,res) {
        let result;
        console.log(req.body);

        if (req.body.pseudo && req.body.password && req.body.firstName &&
            req.body.lastName && req.body.birthDate && req.body.email) {
            try {
                await Mongo.connect();
            } catch (e) {
                console.log('Mongo error connect : '+e);
                return {
                    statusCode: 500,
                    result: "error_database"
                };
            }
            try {
                result =await Mongo.insert({
                    id: '2',
                    pseudo: req.body.pseudo,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    birthDate: req.body.birthDate,
                    email: req.body.email,
                    hasPaid: 'no'
                }, CONF.mongoUserCollection);



            } catch (e) {
                return {
                    statusCode : 500,
                    result : "error_database"
                };
            }
        }
        return {
            statusCode : 200,
            result : result
        };
    }

    async loginAction(req,res) {
        console.log(req.body);
        if (req.body.password && req.body.email) {
            console.log(req.body);
            let password = req.params.password;
            let email = req.params.email;
            let obj;
            let result;

            try {
                await Mongo.connect();
            } catch (e) {
                console.log('Mongo error '+e);
                return {
                    statusCode: 500,
                    result: "error_database"
                };
            }
            try {
                result =  await Mongo.findOne({
                    password: req.body.password,
                    email: req.body.email
                }, CONF.mongoUserCollection);
            } catch (e) {
                return {
                    statusCode: 404,
                    result: "not_recognize"
                }
            }
            console.log(result);
            if(result != null) {
                let token=tokenManager.generateToken(result);
                    //res.setHeader('x-access-token', token);
                if (token) {
                    req.headers['Authorization'] = 'Bearer ' + token
                }
                try {

                    result =await Mongo.insert({
                        id: result.id,
                        email: req.body.email,
                        token: token
                    }, CONF.mongoTokenCollection);

                } catch (e) {
                    return {
                        statusCode : 500,
                        result : "error_database"
                    };
                }
                res=({ success: true, token: 'JWT ' + token });
            }else{
                return {
                    statusCode: 404,
                    result: "User not found"
                }
            }

            return {
                statusCode: 200,
                result: res
            };
        }
    }
/*
    async logoutAction(req,res) {

        let resultUser;
        try {
            await Mongo.connect();
        } catch (e) {
            console.log('Mongo error '+e);
            return {
                statusCode: 500,
                result: "error_database"
            };
        }

        try {
            resultUser =  await Mongo.findOne({
                token : req.token
            }, CONF.mongoTokenCollection);
        } catch (e) {
            return {
                statusCode: 404,
                result: "not_recognize"
            }
        }
        console.log(resultUser);
        try {
              await Mongo.remove(resultUser, CONF.mongoTokenCollection);
        } catch (e) {
            return {
                statusCode: 404,
                result: "not_recognize"
            }
        }

        Mongo.close();

        return {
            statusCode: 200,
            result: "User disconnected"
        }
    }
*/
}

module.exports.connexionController = new ConnexionController();