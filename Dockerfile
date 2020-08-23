FROM node:12
ARG DB_NAME=anubis
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4050
CMD [ "npm", "start" ]