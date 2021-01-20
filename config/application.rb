require_relative 'boot'

require 'rails'

%w[active_model active_job active_record action_controller action_view sprockets].each do |railtie|
  require "#{railtie}/railtie"
end

Bundler.require(*Rails.groups)

module GithubSearch
  class Application < Rails::Application
    config.load_defaults 6.0
    config.time_zone = ENV.fetch('TZ', 'Brasilia')
    config.active_job.queue_adapter = GoodJob::Adapter.new(execution_mode: :external)
    config.generators.system_tests = nil
  end
end
