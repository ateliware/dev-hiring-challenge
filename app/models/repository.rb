# == Schema Information
#
# Table name: repositories
#
#  id         :bigint           not null, primary key
#  repo       :jsonb
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Repository < ApplicationRecord
end
