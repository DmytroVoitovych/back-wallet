const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// const redis = require('redis');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/openapi.json');

const dotenv = require('dotenv');
dotenv.config();

const transactionsRouter = require('./routes/api/transactions');// пути к роутам
const contactsAuthRouter = require('./routes/api/users');// пути к роутам

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors()); 
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/user/auth', contactsAuthRouter); //роутер для работы с логинизацией
app.use('/api/transactions', transactionsRouter); //роутер для работы с транзакцией

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const { status=500, message='Server error' } = err;
  res.status(status).json({status: 'failed', code: status, message, })
});




module.exports = app;
