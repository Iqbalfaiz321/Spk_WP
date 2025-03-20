const jwt = require('jsonwebtoken');

const authenticationToken = (req, res, next) => {
    const token = req.headers('Authorization');
    if (!token) return res.sendStatus(401).json({ message: 'Token not found' });

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

module.exports = authenticationToken;