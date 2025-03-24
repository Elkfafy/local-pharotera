from node:20-alpine as build

workdir /app
copy ./package.json .
run npm install
copy . .

run npm run build

from nginx:1-alpine

run rm /etc/nginx/conf.d/default.conf
copy --from=build /app/dist /usr/share/nginx/html
copy ./nginx/test.pharotera.com.conf /etc/nginx/conf.d
copy ./nginx/certs /etc/nginx/certs
