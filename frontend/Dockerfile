FROM node:22

WORKDIR /app

COPY package.json ./
RUN npm install --force

COPY . .

EXPOSE 8100


RUN npm install -g @angular/cli

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "8100"]
