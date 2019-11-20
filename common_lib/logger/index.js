const winston = require('winston');
require('winston-daily-rotate-file');

var options = {
  file: {
    level: 'info',
    filename: `dubbing.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
const logformat=winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    info=>`[ ${info.timestamp} : ${info.level} ] : ${info.message}`
  )



)
const logger = winston.createLogger({
  format:logformat,
  transports: [
    new winston.transports.Console(options.console),
    // new winston.transports.File({ filename: 'combined.log' })
    new winston.transports.File(options.file)

  ]
});

const errQueryOptions = {
  from: new Date - 24 * 60 * 60 * 1000,
  until: new Date,
  limit: 10,
  start: 0,
  level: 'error',
  order: 'desc',
};

module.exports = {
  /* logging the errors */
  logTheinfo: ( info ) =>{
    logger.log('info', info);
  },
  logTheError: ( error ) =>{
    logger.log('error', error);
  },
  /* querying the errors */
  queryErrors: ( from = new Date, until = new Date) =>{
    return new Promise(( resolve, reject ) =>{
      logger.query({...errQueryOptions,  from, until }, function (err, results) {
        ( err ? reject(err) : resolve(results) );
      });
    })
  }
}