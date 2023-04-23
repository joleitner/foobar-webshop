# Base image
FROM node:20-alpine as base
# set working directory
WORKDIR /usr/src/app
# install dependencies
COPY package*.json ./
RUN npm install
# copy source code
COPY . .

CMD [ "npm", "run", "start:dev" ]