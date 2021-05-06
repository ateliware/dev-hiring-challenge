require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DevHiringChallenge
  # .
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    config.i18n.default_locale = :'pt-BR'

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # Set Timezone
    config.time_zone = 'America/Sao_Paulo'
    config.active_record.default_timezone = :local

    # config.eager_load_paths << Rails.root.join("extras")
    config.middleware.use Rack::Attack
  end
end
