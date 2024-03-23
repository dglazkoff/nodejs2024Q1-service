FROM node:20-alpine
RUN apk add g++ make py3-pip

WORKDIR /usr/src/app

# Setting env up
#ENV RAILS_ENV='production'
#ENV RACK_ENV='production'

COPY . .
RUN npm ci
#EXPOSE 4000 - зачем ?
CMD npm run start:dev