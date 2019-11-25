FROM node:8
ADD src/server/package.json /package.json
RUN npm config set strict-ssl false
RUN npm install
ADD src/server/index.js /index.js
EXPOSE 8080
ENTRYPOINT ["node", "index.js"]
