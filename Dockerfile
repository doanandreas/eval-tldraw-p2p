FROM node:slim

WORKDIR '/app'

RUN apt-get update
RUN apt-get -y install libgtkextra-dev libgconf2-dev libnss3 libasound2 libxtst-dev libxss1 git

COPY package.json .
RUN npm install
COPY . .

CMD [ "npm", "start" ]