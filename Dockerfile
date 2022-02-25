FROM ubuntu:latest


# update 
RUN apt-get update

RUN apt-get install -y inetutils-traceroute
# install curl 
RUN apt-get install -y curl
# get install script and pass it to execute: 
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash
# and install node 
RUN apt-get install -y nodejs
# confirm that it was successful 
RUN node -v
# npm installs automatically 
RUN npm -v

RUN apt install -y python3-pip && apt install -y tcpdump


RUN pip3 install --no-cache --upgrade pip setuptools
RUN pip3 install --pre scapy[basic]

WORKDIR /app

COPY . .

COPY package*.json .

# # Install node depenencies
RUN npm install

EXPOSE 8080

CMD ["npm","run","start:prod"]