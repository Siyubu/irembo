FROM node:12.19.0

ARG PORT

WORKDIR /usr/app

COPY package*.json ./

RUN npm install 

COPY . .

COPY .env.example .env

EXPOSE 5000

CMD [ "npm", "run", "start"]


