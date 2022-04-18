FROM node:16 AS api-build
WORKDIR /usr/src/api
COPY . .
RUN npm install
RUN npm install pm2 typescript ts-node -g
RUN npm run build
EXPOSE 9000
CMD ["pm2-runtime", "process.yaml"]