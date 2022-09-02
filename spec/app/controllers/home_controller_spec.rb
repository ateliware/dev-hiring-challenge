require 'spec_helper'
require 'home_controller'

describe HomeController do
    it 'the request is ok' do
        rb = HomeController.new
        expect(rb.ruby).to eq(JSON.parse(response.body))
    end
end

describe HomeController do
    it 'the request is ok' do
        py = HomeController.new
        expect(py.python).to eq(JSON.parse(response.body))
    end
end

describe HomeController do
    it 'the request is ok' do
        ex = HomeController.new
        expect(ex.elixir).to eq(JSON.parse(response.body))
    end
end

describe HomeController do
    it 'the request is ok' do
        js = HomeController.new
        expect(js.nodejs).to eq(JSON.parse(response.body))
    end
end

describe HomeController do
    it 'the request is ok' do
        cs = HomeController.new
        expect(cs.aspnet).to eq(JSON.parse(response.body))
    end
end
