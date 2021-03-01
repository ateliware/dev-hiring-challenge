# Frontend

[Next.js](https://nextjs.org/) web app that allows you to peek 👀 at the [trending](https://github.com/trending) repositories on GitHub.

## Running the project

- Open the .env.local file and add the Gitpeek API address (eg. API_URL=http://localhost:8080);
- Make sure you have [docker-compose installed](https://docs.docker.com/compose/install/);
- Start the container `docker-compose up`
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result 👀️.

**You can also check the deployed version of [Gitpeek](https://gitpeek.vercel.app/)**

# Backend

Express API that allows you to get a list of the [trending](https://github.com/trending) or the most starred repositories on GitHub of a given language. It also saves the results on a Postgres database.

## Running the project

- **(optional)** Open the .env file and add your GitHub API token to be able to make more than 10 requests per minute (eg. GITHUB_TOKEN=123456);
- Make sure you have [docker-compose installed](https://docs.docker.com/compose/install/);
- Start the containers `docker-compose up`;
- Open [http://localhost:8080](http://localhost:8080) with your browser to test if it's up.

## Routes

- GET /repo?language=LANGUAGE&since=INTERVAL
    - Returns the trending repositories of the given LANGUAGE in the given INTERVAL
    - Possible intervals are: daily, weekly and monthly
- GET /starred_repos?language=LANGUAGE
    - Returns the 50 most starred repos of the given LANGUAGE

**You can also check the deployed version of the [API](https://gitpeekapi.herokuapp.com/)**


