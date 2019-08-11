```                                                                                          
,------.                         ,-----. ,--.               ,--. ,--.                                  
|  .-.  \   ,---.  ,--.  ,--.   '  .--./ |  ,---.   ,--,--. |  | |  |  ,---.  ,--,--,   ,---.   ,---.  
|  |  \  : | .-. :  \  `'  /    |  |     |  .-.  | ' ,-.  | |  | |  | | .-. : |      \ | .-. | | .-. : 
|  '--'  / \   --.   \    /     '  '--'\ |  | |  | \ '-'  | |  | |  | \   --. |  ||  | ' '-' ' \   --. 
`-------'   `----'    `--'       `-----' `--' `--'  `--`--' `--' `--'  `----' `--''--' .`-  /   `----' 
                                                                                       `---'           
```
[![CircleCI](https://circleci.com/gh/marioalvial/dev-hiring-challenge.svg?style=svg)](https://circleci.com/gh/marioalvial/dev-hiring-challenge)
[![codecov](https://codecov.io/gh/marioalvial/dev-hiring-challenge/branch/master/graph/badge.svg)](https://codecov.io/gh/marioalvial/dev-hiring-challenge)

Technical challenge for Ateliware selective process

## Requirements

For building and running the application you need:

- [Docker](https://www.docker.com/)

## Documentation
[Postman](https://documenter.getpostman.com/view/2673922/SVYuqcp7?version=latest)

## Executing requests

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ff78a0d7841fbc312457)

## Running

First, clone the project:

```shell
git clone https://github.com/marioalvial/dev-hiring-challenge.git
cd dev-hiring-challenge
```

#### Running with docker

```shell
./gradlew build && docker-compose up --build
```

## Continuous Integration and Test Coverage

Test Coverage configured on CodeCov. Checkout the [test coverage here](https://codecov.io/gh/marioalvial/dev-hiring-challenge).

Continuous Integration is configured on CircleCI. Checkout the [continuous integration here](https://circleci.com/gh/marioalvial/dev-hiring-challenge)

##  Testing

```shell
./gradlew test
```

## Built With

- [Kotlin](https://kotlinlang.org/) - Programming language
- [IntelliJ](https://www.jetbrains.com/idea/) - IDE
- [Ktor](https://ktor.io/) - Web Framework
- [MySQL](https://www.mysql.com/) - Database
- [Gradle](https://gradle.org/) - Dependency Management
- [Docker](https://www.docker.com/) - Containerization Platform
