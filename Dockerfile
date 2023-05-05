# The instructions for the first stage
FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run migratedb

EXPOSE 5000

CMD ["npm", "run", "dev"]
