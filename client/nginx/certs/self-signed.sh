#!/usr/bin/sh

# name="local.pharotera.com";

# openssl genrsa -out $name.key 2048;
# openssl req -new -key $name.key -out cert.csr;
# openssl x509 -req -days 3650 -signkey $name.key -out $name.crt

openssl req -x509 -newkey rsa:2048 -keyout privkey.pem -out fullchain.pem -days 90 -nodes
