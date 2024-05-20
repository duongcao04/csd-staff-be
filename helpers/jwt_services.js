const jwt = require('jsonwebtoken');
const createError = require('http-errors')

const signAccessToken = (user) => {
	const userId = user.id;
	const userRole = user.role
	return new Promise( (resolve, reject) => {
		const payload = {
			userId,
			userRole
		}
		const secret = process.env.JWT_ACCESS_SECRET;
		const options = {
			expiresIn: process.env.TOKEN_LIFE
		};

		jwt.sign(payload,secret,options, (err, token) => {
			if (err) reject(err);
			resolve(token);
		})
	})
}

const verifyAccessToken = (req,res,next) => {
	if (!req.headers['authorization']) {
		return next(createError.Unauthorized())
	}

	const headers = req.headers['authorization'];
	const bearerToken = headers.split(' ');
	const token = bearerToken[1];

	jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
		if (err) next(createError.Unauthorized())
		req.payload = payload;
		next();
	})
}

module.exports = {  signAccessToken, verifyAccessToken }