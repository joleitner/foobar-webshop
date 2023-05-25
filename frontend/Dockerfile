# Base image
FROM node:20-alpine as base
# set working directory
WORKDIR /usr/src/app
# install dependencies
COPY package*.json .
RUN npm install
# copy source code
COPY . .

####   build    ####
FROM base as build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /usr/src/app ./
RUN npm run build

####   production    ####
FROM node:20-alpine as production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

CMD ["npm", "run", "start"]