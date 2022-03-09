import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false
};

const MONGO_HOST = process.env.MONGO_URL || 'localhost:27017';
const MONGO_NAME = process.env.MONGO_NAME || 'any-travel-db';

const MONGO = {
  host: MONGO_HOST,
  options: MONGO_OPTIONS,
  url: `mongodb://${MONGO_HOST}/${MONGO_NAME}`
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
