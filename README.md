# Getting Started

1. `npm install` to install dependencies

2. Create `cypress.env.json` file for environmental variables

```json
// cypress.env.json

{
    "username": "user",
    "password": "pw"
}
```

Alternatively, export env variables with `CYPRESS_`
```
export CYPRESS_username=user
export CYPRESS_password=pw
```

3. `npm run cypress` to start Cypress interactively or `npm run cypress:all` to run all tests headlessly