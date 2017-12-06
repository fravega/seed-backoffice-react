FROM node:8.9-slim
MAINTAINER facundo.viale@fravega.com.ar

RUN apt-get -yq update && apt-get -yq install bzip2 time

WORKDIR /opt/app

ENV HOME /opt/app
ENV NODE_ENV production
ENV PORT 3000

COPY . /opt/app

EXPOSE 3000
CMD ["node", "server"]
