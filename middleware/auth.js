const config = require('config');
const jwt = require('jwt');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({ msg: "No token auth denied" });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({ msg: "token invalid" });
    }
}

module.exports = auth;