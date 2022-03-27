import dotenv from 'dotenv';
import path from 'path';

const configPath = path.resolve(__dirname, `../../.${process.env.NODE_ENV}.env`);

dotenv.config({ path: configPath });

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false
};

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;

const MONGO = {
  options: MONGO_OPTIONS,
  url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8000;

const TOKEN_ISSUER = process.env.TOKEN_ISSUER || 'any-travel-issuer';
const TOKEN_EXPIRETIME = process.env.TOKEN_EXPIRETIME || 3600;
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'any-travel-jwt-secret';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  token: {
    expireTime: TOKEN_EXPIRETIME,
    issuer: TOKEN_ISSUER,
    secret: TOKEN_SECRET
  }
};

const config = {
  mongo: MONGO,
  server: SERVER
};

export default config;
