FROM ruby:2.7

# Allow apt to work with https-based sources
RUN apt-get update -yqq && apt-get install -yqq --no-install-recommends \
        apt-transport-https

# Install latest LTS version of Nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | \
tee /etc/apt/sources.list.d/yarn.list

# Install packages
RUN apt-get update -yqq && apt-get install -yqq --no-install-recommends \
        nodejs \
        yarn \
        postgresql-client

# Prepare dir and files for source code
WORKDIR /opt/dev-hiring-challenge
COPY Gemfile* ./
RUN bundle install
COPY . /opt/dev-hiring-challenge/

COPY package.json yarn.lock ./
RUN yarn install --check-files

# Add script (workaround)
ENTRYPOINT ["./entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]