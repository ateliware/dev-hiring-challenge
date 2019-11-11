class Repository < ApplicationRecord
    #getting ruby trendings

  def self.update_trending_topics
    Repository.delete_all
    languages = ["ruby", "php", "python", "assembly", "java"]
    languages.each do |language|
      update_repositories(language)
    end
  end

  def self.update_repositories(language)
    url = "https://api.github.com/search/repositories?q=language:#{language}&sort=stars&order=desc&per_page=10"
    request = RestClient.get(url)
    @get_github_ruby= JSON.parse(request.body).with_indifferent_access[:items]
    @get_github_ruby.each do |subhash|
      repository = Repository.create(
        external_id: subhash[:id],
        name: subhash[:name],
        language: subhash[:language],
        owner_name: subhash[:owner][:login]
      )
    end
  end


end