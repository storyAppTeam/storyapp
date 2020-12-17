FROM node:14.8-alpine
WORKDIR /app
RUN npm install -g nodemon
COPY ["package.json", "package-lock.json*", "nodemon.json", "./"]
RUN npm install 
COPY . .
EXPOSE 3000
CMD nodemon server