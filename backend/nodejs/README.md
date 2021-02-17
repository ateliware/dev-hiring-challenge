# TrioTest Backend

This application is written with **Nest.js**, it provides a **swagger ui** endpoint, tests, coverage and it's already configured to be **deployed** on aws using **serverless framework**.

The application has only one module and only one controller. I'm providing a service which handles the favorite based on the rule provided by the test description.

**Important**
You should not care to run this application manually since it's already being handled by docker. If you need to run manually for some reason...
```
yarn install && yarn start
```


### How to access the online docs (Swagger) ?
Go to http://localhost:3000/docs

### How to run the tests?
```
yarn test
```

### How to generate coverage?
```
yarn test:cov
```

### How to deploy with serverless
!Requires AWS access and serverless tool configured with your keys.
```
yarn deploy
```