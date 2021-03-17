require "rails_helper"

RSpec.describe RepositoriesController, type: :routing do
  describe "routing" do
    describe "repositories routes" do
      it "routes to #index" do
        expect(get: "/repositories").to route_to("repositories#index")
      end

      it "routes to #create" do
        expect(post: "/repositories").to route_to("repositories#create")
      end

      it "routes to #destroy" do
        expect(delete: "/repositories/1").to route_to("repositories#destroy", id: "1")
      end
    end

    describe "organizations routes" do
      it "routes to #index" do
        expect(get: "/organizations").to route_to("organizations#index")
      end

      it "routes to #show" do
        expect(get: "/organizations/python").to route_to("organizations#show", slug: "python")
      end
    end
  end
end
