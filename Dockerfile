FROM node:14
RUN mkdir -p /usr/src/flack
WORKDIR /usr/src/flack
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000 
CMD ["npm", "start"]
