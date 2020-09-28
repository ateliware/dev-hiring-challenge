module Github
  class Base
    def send_request(verb, namespace, params = {})
      Retriable.retriable do
        response = Aitch.send(verb, "https://api.github.com/#{namespace}", params, {})
        JSON.parse(response.body)
      end
    end
  end
end