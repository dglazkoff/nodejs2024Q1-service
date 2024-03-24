FROM node:20-alpine as base
RUN apk add g++ make py3-pip

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

# суть в "до инсталла" копи делать, либо после - в обновлении имеджа. Если у вас контейнер будет следить за измененями и перебилдываться, то каждый раз после того, как что-то будет меняться в src, например, следом будут перебилдываться и нод модули (т.к. npm install будет идти после COPY). Это долго и нам это не нужно. Перебилдать нод модули нужно только если что-то изменилось в package.json. Поэтому сначала копируем все джсон *.json, устанавливаем нод модули, и только потом копируем все остальное

RUN npm ci

FROM node:20-alpine
WORKDIR /usr/src/app

COPY . .
COPY --from=base /usr/src/app/node_modules /usr/src/app/node_modules

CMD npm run start:dev