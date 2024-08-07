const winston = require("winston");


const logger = winston.createLogger({
 
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: "logfile.log", level: "error"})
  ]
});

function error (error, req, res, next) {
  logger.error("error", error);




  res.status(500).send("Something failed");
};

module.exports = error;