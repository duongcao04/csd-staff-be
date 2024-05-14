const joi = require('joi');

const userValidate = data => {
	const userSchema = joi.object({
		email: joi.string().pattern(RegExp('csdvietnam.com')).email().lowercase().required(),
		password: joi.string().min(6).max(32).required(),
		information: {
			fullname: joi.string(),
			avatar: joi.string(),
			contactEmail: joi.string(),
			chat: joi.string(),
			location: joi.string(),
			company: joi.string(),
			jobTitle: joi.string(),
			department: joi.string(),
		},
		role: joi.string()
	})
	return userSchema.validate(data)
}

module.exports = {
	userValidate
}