# Freela Handler
Project for handling freelancer clients and projects. Also to learn about some development techniques.

## Run
For development, run `npm run dev`. This will build the containers and attach the express app to your console with live reload.

## Test
For testing, mantain the attached console of `npm run dev` oppened, then open another console attached to the `freela_api` container, then run `npm test`.

So far, there is only integrated tests calling the API routes and checking a few assertions.