# Arohde <> Ateliware

This README documents all the steps necessary to get the application up and running.

## Running example

You can access the example of this application running on Heroku here: [https://arohdeateliware.herokuapp.com/](https://arohdeateliware.herokuapp.com/)

## Dependencies

Ruby

ruby 2.6.6p146 (2020-03-31 revision 67876)

PostgreSQL

Versions 9.3 and up are supported.

## Development Configuration

1. Clone repo

```bash
git clone https://github.com/andrerohde/arohdeateliware
```

2. Install dependencies

```bash
bundle install
```

3. Database creation

```bash
rake db:create
```

4. Database migration

```bash
rake db:migrate
```

5. Run test suite

```bash
bundle exec rspec spec
```

6. Run server

```bash
rails s
```

## Services

Communication service with the github api.

## Extras
 
Access base_url/pghero to see a performance dashboard for Postgres.

## Deployment Instructions

1. Install the Heroku [CLI](https://devcenter.heroku.com/articles/heroku-command-line)

2. Login Heroku

```bash
heroku login
```

3. Add remote repository

```bash
heroku git:remote -a your_heroku_project
```

4. Deploy application to Heroku

```bash
git push heroku master
```

5. Migrate database on Heroku

```bash
heroku run rake db:migrate
```

6. Yay, navigate to your project! o/

https://your_heroku_project.herokuapp.com/

