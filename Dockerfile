FROM ruby:2.7.2-alpine

ENV RAILS_ENV development
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true
ENV APP_HOME /dev-hiring-challenge
ENV BUNDLE_APP_CONFIG="$APP_HOME/.bundle"

RUN apk add --update --no-cache \
      binutils-gold \
      bash \
      build-base \
      busybox \
      ca-certificates \
      curl \
      file \
      g++ \
      gcc \
      git \
      gnupg1 \
      graphicsmagick \
      less \
      libstdc++ \
      libffi-dev \
      libc-dev \
      linux-headers \
      libxml2-dev \
      libxslt-dev \
      libgcrypt-dev \
      libffi-dev \
      libsodium-dev \
      make \
      netcat-openbsd \
      nodejs \
      openssl \
      pkgconfig \
      postgresql-dev \    
      tzdata \
      openssh-client \
      rsync \
      yaml-dev \ 
      sqlite-dev \
      ruby-dev \
      zlib-dev \
      yarn

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY Gemfile Gemfile.lock ./

RUN gem install bundler -v 2.0.2
RUN bundle config
RUN bundle config frozen false

RUN echo 'gem: --no-ri --no-rdoc' > ~/.gemrc

#RUN bundle config --local build.sassc --disable-march-tune-native
#RUN bundle config build.nokogiri --use-system-libraries
#RUN bundle check || bundle install

RUN gem install rails

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
COPY Gemfile Gemfile.lock ./

RUN bundle config build.nokogiri --use-system-libraries
RUN bundle check || bundle install

#COPY package.json yarn.lock ./
#RUN yarn install --check-files

COPY . $APP_HOME

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Start the main process.
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]