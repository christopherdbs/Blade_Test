const CONF = require("./../../config/conf");
const {Mongo} = require("./../Service/Mongo");
const User = require("./../Mongoose/user");
const {tokenManager} = require("./../Model/TokenManager");
const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
//const req = require('mocha');
class ServiceController {

     buyAction(req,res){
        let tokenVerified = tokenManager.verify(req.body.token);
        let result;
        if(tokenVerified){
            try {
                 Mongo.connect();
            } catch (e) {
                console.log('Mongo error '+e);
                return {
                    statusCode: 500,
                    result: "error_database"
                };
            }
            new Promise((res,rej) => {
                try {
                    result =  Mongo.findOne({
                        id: req.body.id
                    }, CONF.mongoUserCollection);

                } catch (e) {
                    return {
                        statusCode: 404,
                        result: "not_recognize"
                    }
                }
                return result;
            }).then((r) => {
                try {
                    result =  Mongo.update({
                        id: req.body.id
                    },{
                        hasPaid : yes
                    }, CONF.mongoUserCollection);

                } catch (e) {
                    return {
                        statusCode: 404,
                        result: "not_recognize"
                    }
                }
                return result;
            })

        }
        return ;
    }

}

module.exports.serviceController = new ServiceController();