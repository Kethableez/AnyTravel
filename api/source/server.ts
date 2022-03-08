import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import logger from './config/logger';

const NAMESPACE = 'Server';
const router = express();

mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logger.info(NAMESPACE, 'Mongo Connected!');
  })
  .catch((error) => {
    logger.error(NAMESPACE, error.message, error);
  });

router.use((req, res, next) => {
  logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logger.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

router.use((req, res, next) => {
  logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logger.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

router.use((req, res) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message
  });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () =>
  logger.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`)
);
