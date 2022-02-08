FROM node:alpine3.14

WORKDIR /app

COPY package*.json .

# Install node depenencies
RUN npm install

# Install traceroute tool
RUN apt-get update -y && apt-get install -y paris-traceroute

CMD [ "node","src/index.js"]