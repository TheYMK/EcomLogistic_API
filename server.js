// ============================================================
//                  Importations
// ============================================================
const express = require('express'),
	mongoose = require('mongoose'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	{ readdirSync } = require('fs');
require('dotenv').config();

// app initialization
const app = express();
// ============================================================
//                    Database Connection
// ============================================================
mongoose
	.connect(process.env.DATABASE_CLOUD, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => console.log('====> ECOMSHOP DATABASE CONNECTED'))
	.catch((err) => console.log(`====> DATABASE CONNECTION ERROR`, err));
// ============================================================
//                   Middlewares
// ============================================================
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());
// ============================================================
//                      Route Middlewares
// ============================================================
readdirSync('./routes/api').map((route) => app.use('/api', require('./routes/api/' + route))); // another way of reading all files from the routes folder
// ============================================================
//                          Server
// ============================================================
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`====> EcomLogistic server running on port ${port}...`);
});
