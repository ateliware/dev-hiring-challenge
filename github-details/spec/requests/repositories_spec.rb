 require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/repositories", type: :request do

  let(:organization) {
    Organization.create(slug: "python")
  }

  let(:valid_attributes) {
    {
      name: "peps",
      organization_id: organization.id,
    }
  }

  let(:invalid_attributes) {
    {
      name: nil,
      organization_id: 999,
    }
  }

  describe "GET /index" do
    it "renders a successful response" do
      Repository.create! valid_attributes
      get repositories_url
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Repository" do
        expect {
          post repositories_url, params: { repository: valid_attributes }
        }.to change(Repository, :count).by(1)
      end
    end

    context "with invalid parameters" do
      it "does not create a new Repository" do
        expect {
          post repositories_url, params: { repository: invalid_attributes }
        }.to change(Repository, :count).by(0)
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested repository" do
      repository = Repository.create! valid_attributes
      expect {
        delete repository_url(repository)
      }.to change(Repository, :count).by(-1)
    end

    it "redirects to the repositories list" do
      repository = Repository.create! valid_attributes
      delete repository_url(repository)
      expect(response).to redirect_to(repositories_url)
    end
  end
end
