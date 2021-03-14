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
  
  # Repository. As you add validations to Repository, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      Repository.create! valid_attributes
      get repositories_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      repository = Repository.create! valid_attributes
      get repository_url(repository)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_repository_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "render a successful response" do
      repository = Repository.create! valid_attributes
      get edit_repository_url(repository)
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

      it "redirects to the created repository" do
        post repositories_url, params: { repository: valid_attributes }
        expect(response).to redirect_to(repository_url(Repository.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Repository" do
        expect {
          post repositories_url, params: { repository: invalid_attributes }
        }.to change(Repository, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post repositories_url, params: { repository: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested repository" do
        repository = Repository.create! valid_attributes
        patch repository_url(repository), params: { repository: new_attributes }
        repository.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the repository" do
        repository = Repository.create! valid_attributes
        patch repository_url(repository), params: { repository: new_attributes }
        repository.reload
        expect(response).to redirect_to(repository_url(repository))
      end
    end

    context "with invalid parameters" do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        repository = Repository.create! valid_attributes
        patch repository_url(repository), params: { repository: invalid_attributes }
        expect(response).to be_successful
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
