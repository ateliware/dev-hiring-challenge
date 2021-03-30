FROM ruby:2.6.6

RUN apt-get update -yqq \
  && apt-get install -yqq --no-install-recomends \
    postgresql-client \
    nodejs \
    qt5-default \
    libqt5webkit-dev

RUN curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -yqq \
  && apt-get install -yqq --no-install-recommends \
    yarn

WORKDIR code/augustoza/github-api-search
COPY Gemfile* ./
RUN bundle install

COPY . .

RUN yarn install