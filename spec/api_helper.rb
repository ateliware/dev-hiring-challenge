require "rails_helper"
require "httparty"

module GqlApi
  def self.server_host
    "http://127.0.0.1:3000"
  end

  def self.client_id
    @client_id ||= "2e8df8de032e1a33e8537153a6cd518b21cc868bbeedb44a112b6bd8a74476c5"
  end

  def self.client_secret
    @client_secret ||= "101c6299e74d5c168a4e6595c0f49b09b4e270295a71f3a5160e00ce20f744d0"
  end

  class Base
    include HTTParty
    include ActiveModel::Model

    attr_accessor :query, :variables, :token

    def default_headers
      @@default_headers ||= {"ContentType" => "application/json"}
    end

    def headers
      return default_headers unless token
      default_headers.merge({"Authorization" => "Bearer #{token}"})
    end

    def call
      HTTParty.post(graphql_url, {
        body: {query: query, variables: variables},
        headers: headers,
      })
    end
  end

  class Public < Base
    def graphql_url
      URI.join(GqlApi.server_host, "/graphql")
    end
  end

  class Passenger < Base
    def graphql_url
      URI.join(GqlApi.server_host, "/passenger/graphql")
    end
  end

  class Driver < Base
    def graphql_url
      URI.join(GqlApi.server_host, "/driver/graphql")
    end
  end
end
