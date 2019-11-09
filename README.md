# github-api-integration

A Spring Boot + Vue example project.

It's a single page with a button to consume a GitHub API and then shows the top 10 repositories given a language input, ordering it by its popularity.

In details, using axios, the front-view calls a back-end RESTFul service API using a POST verb. The back-end consumes a public GitHub API, saves its response in a Postgres database managed by Spring data and then returns a JSON response back to the front-view.

Stack:

 - Spring boot + Sring data 
 - Postgres database
 - Vue + bootstrap + axios
 
 Live website:
 
 https://github-api-integration.herokuapp.com/
