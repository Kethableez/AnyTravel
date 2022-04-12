import bodyParser from 'body-parser';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import morgan from 'morgan';
import cors from 'cors';
import errorMiddleware from './middleware/errorMiddleware';
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
    console.log('Config check', config.server.port);
    mongoose
      .connect(config.mongo.url, config.mongo.options)
      .then(() => console.log('Mongo connected'))
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  private initMiddleware(): void {
    const corsOptions = {
      origin: '*',
      allowedHeaders: 'Content-Type,Authorization',
      methods: 'GET,POST',
      optionSuccessStatus: 200
    };
    this.express.use(cors(corsOptions));
    this.express.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
    this.express.use(bodyParser.json({ limit: '10mb' }));
    this.express.use(morgan('dev'));
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private initErrorHandling(): void {
    this.express.use(errorMiddleware);
    this.express.use(function (req: express.Request, res: express.Response, next) {
      next({ status: 404 });
    });
    this.express.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      res.status(err.status || 500).json({ message: err.message });
    });
  }
}

export default Server;
