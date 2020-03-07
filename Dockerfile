FROM node:10.13-alpine
RUN mkdir -p /home/adam/chatapp/node_modules && chown -R adam:adam /home/adam/chatapp
WORKDIR /home/adam/chatapp
COPY package*.json ./
USER adam
RUN npm install
COPY --chown=adam:adam . .
EXPOSE 8080
CMD ["node", "app.js"]