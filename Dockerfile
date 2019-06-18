FROM node

WORKDIR /usr/src/app/
USER root
COPY package.json ./
RUN npm install

COPY ./ ./

CMD ["npm", "run", "build"]
