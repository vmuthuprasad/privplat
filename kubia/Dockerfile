FROM node:8
ADD src/package.json /package.json
RUN npm install
ADD src/index.js /index.js
EXPOSE 8080
ENTRYPOINT ["node", "index.js"]
