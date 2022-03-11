const MINUTES = 30 * 60000;

const generateActivationData = () => {
  const createdAt = new Date();
  const expiredAt = new Date(createdAt.getTime() + MINUTES);
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  return { createdAt, expiredAt, code };
};

export = generateActivationData;
