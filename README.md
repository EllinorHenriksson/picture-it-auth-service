# Auth service

The Auth-service is responsible for handling accounts and handing out JWTs upon successful authentication. 

This Restful API should be implemented to match (in every detail) the API-documentation found at:
[https://courselab.lnu.se/picture-it/api/v1/auth/doc/](https://courselab.lnu.se/picture-it/api/v1/auth/doc/)

You are free to extend the API; however, the endpoints described in the documentation must still work and serve at least the data described above.

## Generate RS256 key pairs

The JWTs issued by the API should use RS256 encryption (asymmetric). To achieve this, you need to generate private and public keys. 

```bash
$ openssl genrsa -out private.pem 2048
Generating RSA private key, 2048 bit long modulus
.....+++++
...................................+++++
e is 65537 (0x010001)

$ openssl rsa -in private.pem -pubout -out public.pem
writing RSA key

```

*Note: Make sure to use a different key pair in development and production. Do not version control the keys using git!* 

## Multiple MongoDB instances

It is recommended that each service runs its own MongoDB-instance on the production server even though it would be possible to use the same one or an existing one on the production server. The reason for this is that services in microservice architectures should strive to be loosely coupled so that they can be developed, deployed, and scaled independently. 

To achieve this, we can start different containers of the same image on the production server or on localhost.

```bash
$ docker run -d -p 27018:27017 --name mongodb-resource mongo:4.4.3
54b0c78a016d36b2eca2dfa42a8eeabd1a2596bb6acd2721d21bd57cbc6fc381

$ docker run -d -p 27019:27017 --name mongodb-auth mongo:4.4.3
15ce7744f18deedcfdac35839e3f8b184f2e6c83222e79b5ea89ac561dfbb885

$ docker ps
CONTAINER ID   IMAGE         COMMAND                  CREATED         STATUS             PORTS                      NAMES
15ce7744f18d   mongo:4.4.3   "docker-entrypoint.s…"   8 seconds ago   Up 6 seconds       0.0.0.0:27019->27017/tcp   mongodb-auth
54b0c78a016d   mongo:4.4.3   "docker-entrypoint.s…"   6 weeks ago     Up About an hour   0.0.0.0:27018->27017/tcp   mongodb-resource
```
Now you can let the Auth-service connect to port 27018.
