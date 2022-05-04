FROM node:16 AS api-dev
COPY ./api ./api/
WORKDIR /api/
RUN npm install 
RUN npm install -g typescript nodemon ts-node prettier

FROM node:16 AS ui-dev
COPY ./app ./app/
WORKDIR /app/
RUN npm install 
RUN npm install -g @angular/cli

FROM node:16 AS api-prod
WORKDIR /usr/src/api
COPY ./api .
RUN npm install
RUN npm install pm2 typescript ts-node -g
RUN npm run build
EXPOSE 9000
CMD ["pm2-runtime", "process.yaml"]

FROM node:16 as ui-prod
WORKDIR /usr/src/app
RUN npm cache clean --force
COPY ./app .
RUN npm install
RUN npm run build

FROM nginx:latest AS ngi
COPY --from=ui-prod /usr/src/app/dist/app /usr/share/nginx/html
COPY ./app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
