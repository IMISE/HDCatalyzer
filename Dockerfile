FROM httpd:2.4

WORKDIR /app

ENV VITE_DDA_PROXY_URL="https://dda-web.ddnss.de"

COPY . .

RUN apt-get update && apt-get upgrade -y
RUN apt-get install nodejs npm apache2 -y
RUN npm install --ignore-scripts
RUN npm run build-only

CMD echo $VITE_DDA_PROXY_URL && cp -r dist/* /usr/local/apache2/htdocs &&  httpd-foreground