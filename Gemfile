source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.6'

gem 'bootsnap', '>= 1.4.2', require: false
gem 'good_job', '1.0.3'
gem 'httparty', '0.17.3'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 4.1'
gem 'rails', '~> 6.0.3', '>= 6.0.3.2'
gem 'sass-rails', '>= 6'
gem 'turbolinks', '~> 5'
gem 'webpacker', '~> 4.0'

group :development, :test do
  gem 'factory_bot_rails', '6.1.0'
  gem 'pry-rails', '0.3.9'
  gem 'rspec-rails', '4.0.1'
end

group :test do
  gem 'shoulda-matchers', github: 'thoughtbot/shoulda-matchers', tag: 'v3.1.2', ref: 'c0960bd72dd41c4e9bd8b4375254f539776bfe95'
  gem 'super_diff',             '0.5.3'
  gem 'vcr',                    '5.1.0'
  gem 'webmock',                '3.8.2'
  gem 'rails-controller-testing', '1.0.5'
end

group :development do
  gem 'dotenv-rails', '2.7.6'
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.2'
end
