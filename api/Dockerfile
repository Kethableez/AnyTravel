FROM node:16 AS api-build
WORKDIR /usr/src/api
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
RUN npm run build
COPY . .
EXPOSE 9000
CMD ["pm2-runtime", "process.yaml"]