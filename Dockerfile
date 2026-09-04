FROM httpd:2.4

ARG VITE_DDA_PROXY_URL

WORKDIR /app

COPY . .

RUN apt-get update && apt-get upgrade -y
RUN apt-get install nodejs npm apache2 -y

RUN echo "VITE_DDA_PROXY_URL=$VITE_DDA_PROXY_URL" >> .env

RUN npm install --ignore-scripts
RUN npm run build-only

RUN sed -i 's/^#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

SHELL ["/bin/bash", "-c"]
CMD cp -r dist/* /usr/local/apache2/htdocs && cp .htaccess /usr/local/apache2/htdocs && httpd-foreground