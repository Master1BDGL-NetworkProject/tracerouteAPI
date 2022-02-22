FROM node:alpine3.14



WORKDIR /app

COPY . .

COPY package*.json .

# RUN npm install -g npm@8.5.0

# # Install node depenencies
RUN npm install
# && apk add iputils
# Install traceroute tool
# NOT NEED CURRENTLY
# RUN apk update && apk add --upgrade paris-traceroute 

# Install python scripts requirements
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add --upgrade tcpdump

RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN pip3 install --pre scapy[basic]

CMD ["npm","run","start:prod"]