FROM ruby:2.6.2

RUN apt-get update && apt-get install -y build-essential

# for postgres
RUN apt-get install -y libpq-dev

# for a JS runtime
RUN apt-get install -y nodejs

ENV APP_HOME /projetoateliware

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

EXPOSE 3000

ADD . $APP_HOME

COPY Gemfile /projetoateliware/Gemfile
COPY Gemfile.lock /projetoateliware/Gemfile.lock
RUN bundle install
COPY . /projetoateliware
