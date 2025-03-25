from node:22-alpine

copy ./package.json .
run npm install
copy . .

cmd ["node", "index.js"]