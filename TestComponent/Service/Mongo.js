
const MongoClient   = require("mongodb").MongoClient;
const CONF          = require("./../../config/conf");
//const {log}         = require(ROOT+"/src/TestComponent/Service/LogService");

/**
 * Mongo Manager
 */
class Mongo {
    constructor () {
        this.db = false;
    }

    /**
     * Connection to DB
     * @param  {any}    callback callback function
     */
    connect ()
    {
        // Use connect method to connect to the server
        return new Promise((res, rej) => {
            if(this.db) {
                //If the connection still exist, return the instance
                return res(this);
            }

            MongoClient.connect("mongodb://admin:admin123@localhost:27017/BladeTest", (err, db) => {
                if (err) {
                    rej(new Error(JSON.stringify(err)));
                }
                this.db = db;
                //promise the instance of the prototype
                res(this);
            });
        });
    }

    /**
     * insert document
     * @param  {any}    document   the object to insert
     * @param  {string} collection the collection name
     * @return {Promise}               the promise
     */
    insert (document, collection)
    {
        return new Promise((res, rej) => {
            this.db.collection(collection).insertOne(document, (err, result) => {
                if (err) {
                    return rej(new Error(JSON.stringify(err)));
                }
                res(result);
            });
        });
    }
    
    /**
     * remove a document
     * @param {any}    document   matching document
     * @param {string} collection collection name
     * @param {Promise}    callback   the callback function
     */
    remove (document, collection)
    {
        return new Promise((res, rej) => {
            this.db.collection(collection).deleteOne(document, (err, result) => {
                if (err) {
                    return rej(new Error(JSON.stringify(err)));
                }
                res(result);
            });
        });
    }

    /**
     * find documents
     * 
     * @param {any}    document   matching parameter
     * @param {string} collection collection name
     * @return {Promise}               the promise
     */
    find (document, collection)
    {
        return new Promise((res, rej) => {
            this.db.collection(collection).find(document).toArray((err, result) => {
                if (err) {
                    return rej(new Error(JSON.stringify(err)));
                }
                res(result);
            });
        });
    }

    /**
     * find a single document
     *
     * @param {any}    document   matching parameter
     * @param {string} collection collection name
     * @returns {Promise} result : object of single document, err : object, Mongo error
     */
    findOne (document, collection)
    {
        return new Promise((res, rej) => {
            this.db.collection(collection).findOne(document, (err, result) => {
                if (err) {
                    return rej(new Error(JSON.stringify(err)));
                }
                res(result);
            });
        });
    }

    /**
     *
     * @param {any}    document   matching parameter
     * @param {string} collection collection name
     * @returns {Promise}
     */
    aggregate (document, collection)
    {
        return new Promise((res, rej) => {
            this.db.collection(collection).aggregate(document, (err, result) => {
                if (err) {
                    rej(new Error(JSON.stringify(err)));
                }
                res(result);
            });
        });
    }
    /**
     *
     * @param match query match
     * @param update the value to update
     * @param options the all options
     * @param collection collection name
     */
    update (match, update, options, collection)
    {
        return this.db.collection(collection).update(match,update,options, (err, result) => {
            if (e) {
              //  log.simpleLog('Mongo error '+new Error(JSON.stringify(err)));
            }
                res(result);
        });
    }

    /**
     * close the mongo connection
     */
    close () {
        if(this.db) {
            this.db.close();
            this.db = false;
        }
    }
}

module.exports.Mongo = new Mongo();
