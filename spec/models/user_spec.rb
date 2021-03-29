require "rails_helper"

RSpec.describe User, type: :model do
  it { should have_many(:starred_repositories) }
  it { should have_many(:repositories) }
end
