import bodyParser from 'body-parser';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import morgan from 'morgan';
import errorMiddleware from './middleware/error-middleware';

class Server {
  public express: Application;
  public port: number;

  constructor(port: number) {
    this.express = express();
    this.port = port;

    this.initDBConnection();
    this.initMiddleware();
    this.initControllers();
    this.initErrorHandling();
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initDBConnection(): void {
    mongoose
      .connect(config.mongo.url, config.mongo.options)
      .then(() => console.log('Mongo connected'))
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  private initMiddleware(): void {
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

      if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
      }

      next();
    });
    this.express.use(morgan('dev'));
  }

  private initControllers(): void {}

  private initErrorHandling(): void {
    this.express.use(errorMiddleware);
  }
}

export default Server;
