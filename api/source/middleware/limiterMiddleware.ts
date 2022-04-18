import rateLimiter from 'express-rate-limit';

export const limiterMiddleware = (moduleOptions: { windowMs: number; max: number }) =>
  rateLimiter({
    windowMs: moduleOptions.windowMs,
    max: moduleOptions.max,
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (request, response, next, options) =>
      response.status(options.statusCode).json({ message: options.message }),
    skip: () => process.env.API_USE_LIMITER === 'false'
  });
