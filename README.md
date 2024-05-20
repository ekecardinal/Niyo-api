<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A Nestjs App with prisma ORM and mongoDB database</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## .ENV

- MongoDB - DATABASE_URL=Mongo URI
- JWT - JWT_SECRET=secret
- JWT - JWT_EXPIRES=time

## Running the app

```bash
# development
$ npx prisma generate
$ npx prisma db push
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentation

- Author - [PostMan](https://www.postman.com/dark-station-268159/workspace/test)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [EKE Princewill](https://github.com/ekecardinal)
- Twitter - [@eke_cardinal](https://twitter.com/eke_cardinal)
