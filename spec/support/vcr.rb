require 'vcr'

VCR.configure do |c|
  c.cassette_library_dir = 'spec/fixtures/vcr_cassettes'
  c.hook_into :webmock
  c.configure_rspec_metadata!

  c.default_cassette_options = { record: :none }

  c.before_record do |interaction|
    interaction.request.headers.delete('Authorization')
    interaction.request.headers.delete('User-Agent')
    interaction.response.body.force_encoding("ASCII-8BIT").encode('UTF-8', undef: :replace, replace: '')
  end

  # Filter Rails secrets that are strings or numbers
  secrets_to_filter = Rails.application.secrets.select do |key, value|
    value.is_a?(String) || value.is_a?(Numeric)
  end

  secrets_to_filter.each do |key, value|
    begin
      r = URI.parse(value)
      r.user = nil
      r.password = nil
    rescue
      r = value
    end

    c.filter_sensitive_data("<#{key.upcase}>") { r }
    c.filter_sensitive_data("<#{key.upcase}_U>") { CGI.escape(r.to_s) }
  end
end
