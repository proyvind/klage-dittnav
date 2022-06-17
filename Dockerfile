FROM node:12-alpine
ENV NODE_ENV production
ENV NPM_CONFIG_CACHE=/tmp

WORKDIR usr/src/app
COPY server server/
COPY build build/

WORKDIR server
RUN npm install

CMD ["node", "./server.js"]
EXPOSE 8080
