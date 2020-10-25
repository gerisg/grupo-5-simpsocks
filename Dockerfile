FROM node:12.18.4-alpine3.12

RUN mkdir -p /usr/src/dashboard
WORKDIR /usr/src/dashboard

COPY ./dashboard/package.json ./
COPY ./dashboard/package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY ./dashboard .
RUN npm run build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./site/package*.json ./
RUN npm install
RUN npm install -g sequelize-cli
COPY ./site .
RUN mkdir ./public/dashboard && mv ../dashboard/build/* ./public/dashboard && rm -r /usr/src/dashboard

EXPOSE 3000
CMD ["npm", "start"]