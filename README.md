# GitHub Repositories
## My solution to Ateliware's Dev Hiring Challenge

### Overview
The project was built using Elixir 1.11.2 and Phoenix 1.5.7 as a full-stack Web Application.

**Container:** To avoid environment issues, I created two *Dockerfiles* to development and production envs, the local setup can be done using *Docker* and *Docker-Compose*, just be sure you have those dependencies installed on you machine.

**CI/CD:** When a new *push* is triggered on *main* branch, an automated CI pipeline runs using GitHub Actions (see on *./github/workflows/elixir.yml*) running all tests and build, if it passes it's followed by an automated CD pipeline to deploy the App on Heroku (see on *./heroku.yml*)

**Deploy URL:** https://github-repositories-ateliware.herokuapp.com/

### Running locally
There are some *bin* scripts to facilitate the setup (maybe you need to execute as *sudo*).
- To build the Docker image, type: `$ ./bin/setup`

```
🤔 Verifing Docker presence...
✅ Yippee! Docker is present

🤔 Verifing Docker Compose presence...
✅ Hooray! Docker Compose is present

🤔 Building Docker image and project dependencies...
✅ Yay! Built web image successfully

🤔 Creating PostgreSQL Database
✅ Yay! Database created successfully
```

- After building the image with Docker, you can run the tests typing: `$ ./bin/test`

- To run the server, type `$ ./bin/server`. The server should now be running at http://localhost:4001.
