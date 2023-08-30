const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, json } = format;
require('winston-daily-rotate-file');
const fs = require('fs/promises');
const path = require('path');
const logDir = '/log';

 
const getLabel = function (callingModule) {
  var parts = callingModule.filename.split('/');
  return parts[parts.length - 2] + '/' + parts.pop();
};

const dailyRotateFileTransport = filename => new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-${filename}.log`,
  maxSize: "1g",
  maxDays: "3d",
  zippedArchive: true,
  datePattern: 'YYYY-MM-DD'
});

// const customFormat = printf(({ level, message, timestamp, stack }) => {
//   return `${timestamp} [${level}] ${file_path}: ${stack || message}`;
// });
const DATE = (new Date().toJSON().slice(0,10).split('-').reverse().join('-'));
const logger = createLogger({
   levels: config.syslog.levels,
   defaultMeta: { component: 'system-service' },
   format: combine(
       timestamp({
           format: 'YYYY-MM-DD HH:mm:ss'
       }),
       json()
      //  customFormat
     ),
  
   transports: [
       new transports.Console({
        level: 'error',
        label: getLabel(module),
        colorize: true,
      }),
       new transports.File({ filename: 'logs/error/'+DATE+'-error.log' }),
      //  dailyRotateFileTransport('error')
     ]
 });


 const scrapperLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'user-service' },
  format: combine(
      timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
      }),
      json()
    ),
 
  transports: [
      new transports.Console({
        level: 'info',
       label: getLabel(module),
       colorize: true,
     }),
      new transports.File({ filename: 'logs/info/'+DATE+'-scrapper_logs.log' }),
      // dailyRotateFileTransport('scrapper_logs')
    ]
});

const apiLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'user-service' },
  format: combine(
      timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
      }),
      json()
    ),
 
  transports: [
      new transports.Console({
       level: 'debug',
       label: getLabel(module),
       colorize: true,
     }),
      new transports.File({ filename: 'logs/api/'+DATE+'-api_logs.log' }),
      // dailyRotateFileTransport('scrapper_logs')
    ]
})
module.exports = {logger, scrapperLogger, apiLogger};