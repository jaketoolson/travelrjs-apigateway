FROM node:14

RUN mkdir -p /var/www

ADD package.json /var/www

WORKDIR /var/www

RUN npm install

ADD . /var/www

EXPOSE 3000

CMD npm run serve:debug
