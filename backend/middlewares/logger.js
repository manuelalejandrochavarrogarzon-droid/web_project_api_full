const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'request.log'),
    }),
  ],
  format: winston.format.json(),
  meta: true,
  msg: '{{req.method}} {{req.url}}',
  expressFormat: false,
  colorize: false,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'error.log'),
    }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
