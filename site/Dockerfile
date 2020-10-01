FROM node:12.18.4-alpine3.12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g sequelize-cli

COPY . .

EXPOSE 3000
CMD ["npm", "start"]