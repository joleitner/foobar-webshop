# Base image
FROM node:20-alpine as base
# set working directory
WORKDIR /usr/src/app
# install dependencies
COPY package*.json ./
RUN npm install
# copy source code
COPY . .

####   build    ####
FROM base as build
ENV NODE_ENV=build
WORKDIR /build
COPY --from=base /usr/src/app ./
RUN npm run build && npm prune --production

####   production    ####
FROM node:20-alpine as production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package*.json ./
COPY --from=build /build/dist/ ./dist
COPY --from=build /build/prisma/ ./prisma/

# run migrate db for deployment and start server
CMD npx prisma migrate deploy && npm run start:prod
