# parent image
FROM ubuntu:18.04
#FROM python:3.7-alpine

MAINTAINER Sung-Lin Yeh <ff936tw@gmail.com>

RUN apt-get update \
  && apt-get install -y python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip \
  && pip install numpy

RUN apt-get install -y \
    nodejs \
    npm \
    vim
RUN apt-get -y update

RUN mkdir -p workspace
WORKDIR workspace
COPY . .

RUN npm install \
    && cd eval/coco/ \
    && make
    

