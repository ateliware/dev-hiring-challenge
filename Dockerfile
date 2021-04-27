# A simple Dockerfile for a RoR application

FROM ruby:2.6.6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
 
RUN apt-get update && apt-get install -y nodejs --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY Gemfile /usr/src/app/
ADD Gemfile.lock /usr/src/app/Gemfile.lock
 
RUN gem install bundler 
RUN bundle install
 
COPY . /usr/src/app
 
EXPOSE 3000