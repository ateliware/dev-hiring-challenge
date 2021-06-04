FROM ruby:2.7.1-alpine3.10
ENV BUNDLER_VERSION=2.1.4
RUN apk add --update --no-cache \
      binutils-gold \
      build-base \
      curl \
      file \
      g++ \
      gcc \
      git \
      less \
      libstdc++ \
      libffi-dev \
      libc-dev \
      linux-headers \
      libxml2-dev \
      libxslt-dev \
      libgcrypt-dev \
      make \
      netcat-openbsd \
      nodejs \
      openssl \
      pkgconfig \
      postgresql-dev \
      python \
      tzdata \
      yarn

RUN gem install bundler -v 2.1.4

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle check || bundle install

COPY package.json yarn.lock ./
RUN yarn install --check-files

COPY . ./

ENTRYPOINT ["./entrypoints/docker-entrypoint.sh"]
