# Base image
FROM node:20-alpine as base
# set working directory
WORKDIR /usr/src/app
# install dependencies
COPY package*.json .
RUN npm install
# copy source code
COPY . .

# build TypeScript code
RUN npm run build

CMD ["npm", "run", "dev"]