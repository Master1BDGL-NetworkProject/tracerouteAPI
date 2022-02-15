FROM node:alpine3.14

WORKDIR /app

COPY . .

COPY package*.json .

# Install node depenencies
RUN npm install
# && apk add iputils
# Install traceroute tool
RUN apk update && apk add --upgrade paris-traceroute 

CMD [ "node","src/index.js"]