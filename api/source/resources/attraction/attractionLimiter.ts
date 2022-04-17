const createLimiter = {
  windowMs: 15 * 60 * 1000,
  max: 10
};

const getLimiter = {
  windowMs: 15 * 60 * 1000,
  max: 100
};

export default {
  createLimiter,
  getLimiter
};
