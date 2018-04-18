
const {userController}  = require('./../TestComponent/Controller/UserController');
const {connexionController}  = require('./../TestComponent/Controller/ConnexionController');
const {serviceController}  = require('./../TestComponent/Controller/ServiceController');

class CheckoutFactory {
    constructor ()
    {
        this.controllers = {
            userController: userController,
            connexionController: connexionController,
             serviceController: serviceController

        };
    }

    init (controller, method, req)
    {
        return this.controllers[controller+"Controller"][method+"Action"](req);
    }
}

module.exports.checkoutFactory = new CheckoutFactory();