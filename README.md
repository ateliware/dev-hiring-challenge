# DevHiringChallenge v1.0

This is a sample app for ateliware recruiting challenge. It is a Rails 6.0 app for showing Github repositories, based on programming language.

It also features a favorite button, which saves favorite repositories and shows them through an API.

## Requirements

- Ruby 2.7.2
- Rails 6.0.3
- PostgreSQL Database
- Deployed on Heroku

To install gems use

```
bundle install
```

The migration file is already present, thus only migrate is necessary

```
rails db:migrate
```

You can locally run the server by

```
rails server
```

## Testing

Testing was developed under Minitest::Unit and ActiveSupport::TestCase

Database for testing can be create through

```
rails db:create RAILS_ENV=test
```

And migrated using

```
rails db:migrate RAILS_ENV=test
```

Tests can be deployed either on

```
rake test test/controller/repository_controller_test.rb
```

or

```
rake test test/controller/browsegithub_controller_test.rb
```

## Deploy

The app is currently available at

https://ateliwarerailschallenge.herokuapp.com/


## Routing
| URL | Route | Description |
| ----------- | ---- | --------- |
| / | browsegithub#index | Root page |
| /repository.json | repositories#index | Lists all saved repositories |
| /repository/new/{:name}{:description}{:language}{:stars}{:url} | repositories#create | Stores a new repository |