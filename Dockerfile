FROM node:carbon

WORKDIR /usr/src/sandbox

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]
