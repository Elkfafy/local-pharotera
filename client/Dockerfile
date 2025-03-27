# 1- node
# 2- install dep
# 3- convert to html, css, js

from node:20-alpine as online-client-compiled

workdir /client
copy ./package.json .
run npm install

copy . .

run npm run build

# copy dist to web server => nginx
# install nginx
from nginx:1-alpine

# copy dist folder(from dist image)
copy --from=online-client-compiled /client/dist /usr/share/nginx/html
copy ./nginx/online.conf /etc/nginx/conf.d
copy ./nginx/certs /etc/nginx/certs
