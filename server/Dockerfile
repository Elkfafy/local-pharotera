from node:22-alpine

copy ./package.json .
run npm install
copy . .
expose 3000
cmd ["node", "index.js"]