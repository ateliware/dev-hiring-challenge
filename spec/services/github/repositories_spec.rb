# frozen_string_literal: true

require "rails_helper"

RSpec.describe ::Github::Repositories, :vcr do
  subject { described_class.new(params) }

  describe "#call" do
    describe "failure" do
      context "when no language is set" do
        let(:params) { nil }

        it { expect(subject.call).to be_falsey }
      end

      context "when api returns failure" do
        let(:params) { { language: "C" } }

        before do
          allow(subject).to receive(:search_query).and_return({})
        end

        it { expect(subject.call).to be_falsey }
      end
    end

    describe "success" do
      let(:params) { { language: "C" } }

      it { expect(subject.call.total_count).to be(1_664_216) }
      it { expect(subject.call.repositories).to include(have_key("external_id")) }
    end
  end
end
