FROM node:14.18.1

WORKDIR /app

COPY . .

RUN npm install

EXPOSE  3006

CMD [ "node", "server"]

