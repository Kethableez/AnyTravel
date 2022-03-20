FROM node:16 AS ui-build
COPY ./app ./app/
WORKDIR /app/
RUN npm install 
RUN npm install -g @angular/cli
