# frozen_string_literal: true

module FilesTestHelper
  extend self
  extend ActionDispatch::TestProcess

  def png_name
    'test-image.png'
  end

  def png
    fixture_file_upload(file_path(png_name), 'image/png')
  end

  private

    def file_path(filename)
      Rails.root.join('spec', 'fixtures', 'files', filename)
    end
end

FactoryBot::SyntaxRunner.class_eval do
  include FilesTestHelper
end

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
