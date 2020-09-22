class ApiImporter
    require 'rest_client'
    attr_accessor :languages

    def initialize(language)        
        @languages = language
        @owner = ['login', 'avatar_url']
        @repository = ['name', 'full_name', 'html_url', 'description', 'language', 'stargazers_count','forks','open_issues','watchers']
        Repository.delete_all
    end

    def call
        @languages.each {|language| execute_request(language)}
    end

    private
    
    def start_object_hash
        attributes = {}
        Repository.attribute_names.each do |k|
          attributes[k] ||= nil
        end
        attributes          
    end

    def execute_request(language)
        attributes = start_object_hash

        RestClient.get("https://api.github.com/search/repositories?q=language:#{language}&sort=stars&page=1&per_page=1", headers={}) do |response, request, result, &block|
        ActiveSupport::JSON.decode(response).each do |k, v|
          if k == 'items'
              v.each do |object|
                ActiveSupport::JSON.decode(object.to_json).each do |key, value|
                  if key == 'owner'
                    ActiveSupport::JSON.decode(value.to_json).each do |key_obj, value_obj|
                      attributes["#{key}_#{key_obj}"] = value_obj if @owner.include?(key_obj)
                    end
                  else                   
                    attributes[key] = value if @repository.include?(key)
                  end
                end
              end
            end
          end
        end
        Repository.create(attributes)
    end        
   
end