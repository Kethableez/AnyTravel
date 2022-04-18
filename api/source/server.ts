import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from './config/config';
import error from './middleware/errorMiddleware';
import Controller from './utils/models/controllerModel';

class Server {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initDBConnection();
    this.initMiddleware();
    this.initControllers(controllers);
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
    this.express.use(cors(config.server.cors));
    this.express.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
    this.express.use(bodyParser.json({ limit: '10mb' }));
    this.express.use(morgan('dev'));
    this.express.use(compression());
    this.express.use(helmet());
    this.express.use(cookieParser());
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private initErrorHandling(): void {
    this.express.use(error.notFoundMiddleware);
    this.express.use(error.errorMiddleware);
  }
}

export default Server;
