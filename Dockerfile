FROM ruby:3.1.2

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
WORKDIR /github-search
COPY Gemfile /github-search/Gemfile
COPY Gemfile.lock /github-search/Gemfile.lock
RUN bundle install

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]
