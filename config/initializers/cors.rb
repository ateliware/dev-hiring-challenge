Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins "http://localhost:3000", 'https://ateliware-dev-challenge-nader.herokuapp.com/'
        resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true
    end

end