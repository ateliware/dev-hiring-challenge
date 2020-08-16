class Repository < ApplicationRecord

  def self.search(query)
  end

  private

  def github
    @github ||= Github.new client_id: " ", client_secret: " "
  end

end

