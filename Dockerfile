# FROM --platform=linux/x86_64 node:20
FROM node

WORKDIR /home/app

COPY package*.json . 

RUN yarn config set network-timeout 3000000
RUN yarn 

# có ORM -> thêm câu lệnh prisma
COPY ./src/prisma ./src/prisma
RUN yarn prisma generate --schema src/prisma/schema-postgres.prisma 
RUN yarn prisma generate --schema src/prisma/schema-mysql.prisma

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]
