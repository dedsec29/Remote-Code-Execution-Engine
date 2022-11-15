FROM node:16-alpine3.11
WORKDIR '/app'

COPY package.json .
RUN npm install
COPY . .

RUN apk update && apk add bash
CMD ["npm","start"]