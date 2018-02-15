FROM node:carbon

RUN mkdir -p /usr/src/test
WORKDIR /usr/src/test

COPY package*.json /usr/src/test/
COPY index.js /usr/src/test/

RUN npm install

EXPOSE 4000

RUN ["npm", "start"]