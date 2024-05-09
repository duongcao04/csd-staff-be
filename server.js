const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./helpers/connection_mongodb');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('common'));

app.get('/', (req, res) => {
	res.send("Hello world!!!")
})

//No match route => create error "This route does not exist"
app.all('*', (req, res, next) => {
	next(createError.NotFound("This route does not exist."))
})

//Middleware
app.use((err, req, res, next) => {
	if (!err) return next()
	res.json({
		status: err.status || 500,
		message: err.message
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})