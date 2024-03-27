FROM node:21

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start-dev" ]