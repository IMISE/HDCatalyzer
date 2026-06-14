FROM httpd:2.4

WORKDIR /app

COPY . .

RUN apt-get update && apt-get upgrade -y
RUN apt-get install nodejs npm apache2 -y
RUN npm install --ignore-scripts
RUN npm run build-only

CMD cp -r dist/* /usr/local/apache2/htdocs &&  httpd-foreground