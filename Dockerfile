
# Extend from the official Elixir image
FROM elixir:1.11.2-alpine


# Install required libraries on Alpine
# note: build-base required to run mix “make” for
# one of my dependecies (bcrypt)
RUN apk update && apk upgrade && \
  apk add postgresql-client && \
  apk add nodejs npm && \
  apk add build-base && \
  rm -rf /var/cache/apk/*

# Install hex package manager and rebar
# By using --force, we don’t need to type “Y” to confirm the installation
RUN mix do local.hex --force, local.rebar --force


# Cache elixir dependecies and lock file
COPY mix.* ./

# Install and compile production dependecies
RUN mix do deps.get
RUN mix deps.compile


# Cache and install node packages and dependencies
COPY assets/package.json assets/

RUN cd assets && \
    npm install


# Copy all application files
COPY . ./


# Run frontend build, compile, and digest assets
RUN cd assets/ && \
    npm run deploy && \
    cd - && \
    mix do compile, phx.digest

# Run entrypoint.sh script
RUN chmod +x entrypoint.sh

CMD ["/entrypoint.sh"]
