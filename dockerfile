FROM node:16-alpine
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install -D typescript 
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]