import path from 'path';

const BASE_PATH = path.resolve('storage');

export const getPath = (selector: string, filename?: string) => {
  return filename ? path.join(BASE_PATH, selector, filename) : path.join(BASE_PATH, selector);
};
