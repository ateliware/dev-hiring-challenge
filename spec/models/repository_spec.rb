# == Schema Information
#
# Table name: repositories
#
#  id         :bigint           not null, primary key
#  repo       :jsonb
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe Repository, type: :model do
  it 'verifica se o repositorio foi informado' do
    repository = Repository.create({})
    expect(repository.save).to be(false)
  end
end
