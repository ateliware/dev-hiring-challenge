class RepositoriesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "repositories"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
