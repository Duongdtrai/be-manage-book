# The instructions for the first stage
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN chmod +x /usr/src/app/docker-start.sh

EXPOSE 5000

ENTRYPOINT ["/usr/src/app/docker-start.sh"]
