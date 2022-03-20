FROM node:16 AS ui-build
COPY ./app ./app/
WORKDIR /app/
RUN npm install 
RUN npm install -g @angular/cli

FROM node:16 AS api-build
COPY ./api ./api/
WORKDIR /api/
RUN npm install 
RUN npm install -g typescript nodemon ts-node prettier
