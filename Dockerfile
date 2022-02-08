FROM node:alpine3.14

WORKDIR /app
COPY . .

COPY package*.json .

# Copy source code

# Install node depenencies
RUN npm install

# Install traceroute tool
RUN apk update && apk add --upgrade paris-traceroute

CMD [ "node","src/index.js"]