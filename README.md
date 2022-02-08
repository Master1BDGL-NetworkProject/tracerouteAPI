# Traceroute & Ping APIs

This repository contains the required code for building the server of the traceroute and ping, which are required for building the client.

## Features

- [x] Traceroute
    This feature will use `paris-traceroute` as command line on the server
- [x] Ping 
    This feature will work as the command above


## How to build the image

For build the image run this command

`docker build -t trace-in-server .`


## How to make it running

For running an instance of the image run this command below:

`docker run --name <name-of-container> -p <desired-port>:8080 trace-in-server`