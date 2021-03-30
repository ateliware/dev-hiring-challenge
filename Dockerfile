FROM ruby:2.7.2

ENV RAILS_ENV development

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./

RUN bundle install

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt update && apt install -y nodejs yarn