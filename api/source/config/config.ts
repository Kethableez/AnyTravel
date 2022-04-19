import dotenv from 'dotenv';

dotenv.config();

const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_NAME = process.env.MONGO_NAME || 'test';

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8000;
const SERVER_MODE = process.env.NODE_ENV || 'development';

const TOKEN_ISSUER = process.env.TOKEN_ISSUER || 'any-travel-issuer';
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'any-travel-jwt-secret';
const TOKEN_EXPIRETIME_AUTH = process.env.TOKEN_EXPIRETIME_AUTH || '30m';
const TOKEN_EXPIRETIME_REFRESH = process.env.TOKEN_EXPIRETIME_REFRESH || '1y';

const REQUEST_LIMIT_WINDOW = Number(process.env.REQUEST_LIMIT_WINDOW) || 60000;
const REQUEST_LIMIT_MAX = Number(process.env.REQUEST_LIMIT_MAX) || 10;

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false
};

const CORS_OPTIONS = {
  origin: 'http://localhost:4200',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true,
  methods: 'GET, POST',
  preflightContinue: true,
  maxAge: 600
};

const HELMET_OPTIONS = {
  crossOriginEmbedderPolicy: false
};

const REQUEST_LIMITER = {
  windowMs: REQUEST_LIMIT_WINDOW,
  max: REQUEST_LIMIT_MAX
};

const SERVER = {
  mode: SERVER_MODE,
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  cors: CORS_OPTIONS,
  helmet: HELMET_OPTIONS,
  requestLimiter: REQUEST_LIMITER,
  token: {
    authExpireTime: TOKEN_EXPIRETIME_AUTH,
    refreshExpireTime: TOKEN_EXPIRETIME_REFRESH,
    issuer: TOKEN_ISSUER,
    secret: TOKEN_SECRET
  }
};

const MONGO = {
  options: MONGO_OPTIONS,
  url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`
};

const config = {
  server: SERVER,
  mongo: MONGO
};

export default config;
