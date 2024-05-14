const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { required } = require("joi");
const Schema = mongoose.Schema

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	information: {
		fullname: {
			type: String,
			default: this.email
		},
		avatar: {
			type: String,
			default: 'https://www.csdvietnam.com/assets/img/logo.webp'
		},
		contactEmail: {
			type: String,
			default: this.email
		},
		chat: {
			type:String,
			default: '',
		},
		location: {
			type:String,
			default:'HCM City, Vietnam'
		},
		company: {
			type:String,
			default: 'CADSQUAD VIETNAM'
		},
		jobTitle: {
			type: String,
			default: 'Employeer'
		},
		department: {
			type:String,
			default: 'Engineer Department'
		}
	},
	role: {
		type: String,
		enum: ['manager', 'engineer', 'external'],
		default: 'external',
	},
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
	try {
		console.log(`Called before save::: ${this.email} ${this.password} `);
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error)
	}
})

UserSchema.methods.isCheckedPasswrod = async function (password) {
	try {
		return await bcrypt.compare(password, this.password)
	} catch (error) {
		// next(error)
	}
}

module.exports = mongoose.model('User', UserSchema)