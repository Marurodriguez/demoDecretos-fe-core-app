FROM nginx AS ngi
WORKDIR /tmp
COPY . .
COPY ./docker/nginx.conf  /etc/nginx/conf.d/default.conf
RUN apt update
RUN apt install -y nodejs npm
RUN npm install
RUN npm run ng build
RUN rm -R /usr/share/nginx/html
RUN mv /tmp/dist/admDecretos /usr/share/nginx/html
EXPOSE 80
