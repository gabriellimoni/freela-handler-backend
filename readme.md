# Freela Handler
Project for handling freelancer clients and projects. Also to learn about some development techniques.

## Run
For development, run `npm run dev`. This will build the containers and attach the express app to your console with live reload.

## Test
For testing, mantain the attached console of `npm run dev` oppened, then open another console attached to the `freela_api` container, then run `npm test`.

So far, there is only integrated tests calling the API routes and checking a few assertions.

### TODOs
- Add filters to list clients and jobs
- Add logs and error monitoring (Sentry?) - for now its just on file
- Add routes sanitizers/validators
- Add user handling with login/logout, refresh token and browser safe

### Host info
`docker-compose.prd.yaml` has an template of the docker-compose file to deploy into Digital Ocean Droplet, for example.

For proper deploy, you need to follow the steps of this tutorial: https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose-pt