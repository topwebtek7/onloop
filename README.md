# OnLoop TEST

## Getting started

You need to create a keys folder in the application root directory, and inside of it, you should move the .json file provided by Google Firestore. Read more information about this: [Google Firestore SDK documentation](https://firebase.google.com/docs/admin/setup?authuser=0). This file is required in [db.ts](https://github.com/topwebtek7/onloop/blob/master/src/db.ts#L10)

For local testing, please run [Firebase Local Emulator](https://firebase.google.com/docs/emulator-suite).
And please create `.env` file referring `.env.example`.

#### Setup

`yarn install` or `npm install`

#### Development

`yarn dev` or `npm run dev`

#### Build

`yarn build` or `npm run build`

#### Documentation
`yarn doc` or `npm run doc`
Generates the project's documentation using typedoc in `/docs` folder.

#### Test
`yarn test` or `npm run test`

### API Endpoint

##### User CRUD endpoints

`POST user/`
`GET user/:id`
`GET user/`
`PUT user/:id`
`DELETE user/:id`

##### Preview Link endpoint

`/previewLink`


## Task Completion

Please import `OnLoop.postman_collection.json` file in Postman to test API endpoints.

- [x] Task1
Create a simple CRUD app using NodeJS Express server and expose 4 API endpoints for each of create, read, update and delete operations

- [x] Task2
Write a custom API in the same NodeJS Express server to fetch data from a 3rd party API and store it in Firestore