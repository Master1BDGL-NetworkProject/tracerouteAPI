FROM node:alpine3.14

WORKDIR /app

COPY package*.json .

# Install node depenencies
RUN npm install

# Install traceroute tool
RUN apk update && apk add --upgrade paris-traceroute

CMD [ "node","src/index.js"]