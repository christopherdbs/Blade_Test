const jwt = require('jsonwebtoken');
const config = require('./../../config/conf');
class TokenManager{

    /* return jwt token */
    generateToken(user){
        let token = jwt.sign(user, config.secret, {
            expiresIn: 604800
        });
        return token;
    }

    verify(token) {
        var decoded = false;
        try {
            decoded = jwt.verify(token, config.secret);
        } catch (e) {
            decoded = false; // still false
        }
        return decoded;
    }

}

module.exports.tokenManager= new TokenManager();