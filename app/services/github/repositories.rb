module Github
  class Repositories < Base
    def initialize(sort, page, per_page, language)
      @sort = sort
      @page = page
      @per_page = per_page
      @language = language
    end

    def send
      params = { page: @page, per_page: @per_page, q: 'language=' + @language }
      send_request('get', 'search/repositories', params)
    end
  end
end