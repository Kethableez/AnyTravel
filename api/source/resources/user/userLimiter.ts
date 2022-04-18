const getLimiter = {
  windowMs: 15 * 60 * 1000,
  max: 100
};

const createLimiter = {
  windowMs: 15 * 60 * 1000,
  max: 2
};

export default {
  getLimiter,
  createLimiter
};
