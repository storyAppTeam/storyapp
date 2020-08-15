FROM node:12.18-alpine
WORKDIR /app
RUN npm install -g nodemon
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install 
COPY . .
EXPOSE 3000
CMD nodemon server