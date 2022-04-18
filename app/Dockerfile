FROM node:16 as app-build
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=app-build /usr/app/dist/app /usr/share/nginx/html
EXPOSE 80
