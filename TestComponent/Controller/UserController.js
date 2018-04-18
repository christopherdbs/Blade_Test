const CONF = require("./../../config/conf");
const {Mongo} = require("./../Service/Mongo");
const User = require("./../Mongoose/user");
const {tokenManager} = require("./../Model/TokenManager");
const MongoClient = require("mongodb").MongoClient;
assert = require('assert');
//const req = require('mocha');
class UserController {

    async profileAction(req, res) {

        let result;
        let token;
  console.log(req.body);
        try {
            await Mongo.connect();
        } catch (e) {
            console.log('Mongo error connect : ' + e);
            return {
                statusCode: 500,
                result: "error_database"
            };
        }

        try {
            token = await Mongo.findOne({
                id : req.body.id
            },CONF.mongoTokenCollection);
        } catch (e) {
            console.log('Mongo error connect : ' + e);
            return {
                statusCode: 500,
                result: "No token found"
            };
        }
    console.log(token);
        if(token) {


            try {
                result = await Mongo.findOne({
                    pseudo: req.body.pseudo
            },CONF.mongoUserCollection);
            } catch (e) {
                return {
                    statusCode: 404,
                    result: "User data not found"
                }
            }
        }else {

            return {
                statusCode: 404,
                result: 'User not found'
            };
        }
        return {
            statusCode: 200,
            result: result
        };
    }
}

module.exports.userController = new UserController();