FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install ts-node typescript --save-dev

COPY . .

EXPOSE 3000

CMD ["npx", "ts-node", "src/server.ts"]