require 'rails_helper'

RSpec.describe Repositorio, :type => :model do
    subject {
        described_class.new(nome: "teste",
            descricao: "teste",
            score: 0,
            data_criacao: DateTime.now,
            forks: 0,
            url: 'teste')
    }
    it "is valid with valid attributes" do
        expect(subject).to be_valid
    end
    it "is not valid without a nome" do
        subject.nome = nil
        expect(subject).to_not be_valid
    end
    it "is not valid without a descricao" do
        subject.descricao = nil
        expect(subject).to_not be_valid
    end
    it "is not valid without a score" do
        subject.score = nil
        expect(subject).to_not be_valid
    end
    it "is not valid without a data_criacao" do
        subject.data_criacao = nil
        expect(subject).to_not be_valid
    end
    it "is not valid without a forks" do
        subject.forks = nil
        expect(subject).to_not be_valid
    end
    it "is not valid without a url" do
        subject.url = nil
        expect(subject).to_not be_valid
    end
end
