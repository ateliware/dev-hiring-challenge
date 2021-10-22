FROM elixir:1.12-alpine

RUN apk update && \
    apk add inotify-tools && \
    apk add postgresql-client && \
    apk add nodejs && \
    apk add npm && \
    mix local.hex --force && \
    mix archive.install hex phx_new 1.5.3 --force && \
    mix local.rebar --force

ENV APP_HOME /app
RUN mkdir $APP_HOME

WORKDIR $APP_HOME

CMD ["sh", "setup.sh"]

