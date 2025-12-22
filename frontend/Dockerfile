# usa la imagen ARM compatible
FROM --platform=linux/arm64/v8 node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g @angular/cli

EXPOSE 8100

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "8100"]
