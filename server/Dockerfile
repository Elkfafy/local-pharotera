# creating server image ready to being built
from node:20-alpine

workdir /server
copy . .
run npm install

# container => run time environment
# when creating a container
cmd ["node", "index.js"]

# create network => [server]----[mongo]
