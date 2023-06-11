const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, json } = format;
 
const getLabel = function (callingModule) {
  var parts = callingModule.filename.split('/');
  return parts[parts.length - 2] + '/' + parts.pop();
};

const logger = createLogger({
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
        label: getLabel(module),
        colorize: true,
      }),
       new transports.File({ filename: 'error.log' })
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
       label: getLabel(module),
       colorize: true,
     }),
      new transports.File({ filename: 'scrapper_logs.log' })
    ]
});

 module.exports = {logger, scrapperLogger};