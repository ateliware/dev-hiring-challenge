FROM elixir:1.12-alpine


RUN apk update && \
    apk add inotify-tools && \
    apk add nodejs && \
    apk add npm && \
    mix local.hex --force && \
    mix archive.install hex phx_new 1.5.3 --force && \
    mix local.rebar --force

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

CMD ["mix", "phx.server"]

