require 'rails_helper'

RSpec.describe Star do
  describe '.fetch_all_from_github_or_database' do
    context 'when there are some stars in the database' do
      it 'returns stars from the database' do
        stars_in_the_database = [instance_double(Star)]

        expect(Star).to receive(:any?).and_return(true)
        expect(Star).to receive(:all).and_return(stars_in_the_database)

        stars = Star.fetch_all_from_github_or_database

        expect(stars).to eq stars_in_the_database
      end
    end

    context "when there aren't any stars in the database" do
      it 'fetches stars from GitHub and persists them' do
        from_github = [{ full_name: 'owner/repo' }]
        stars_from_database = [instance_double(Star)]

        expect(Star).to receive(:any?).and_return(false)
        expect(Star).to receive(:from_github).and_return(from_github)
        expect(Star).to receive(:create_from_resources_collection).with(from_github)
        expect(Star).to receive(:all).and_return(stars_from_database)

        stars = Star.fetch_all_from_github_or_database

        expect(stars).to eq stars_from_database
      end
    end
  end

  describe '.create_from_resources_collection' do
    it 'persists the given collection into the database' do
      star = double 'Resource',
        full_name: 'owner/repo',
        html_url: 'https://github.com/owner/repo',
        description: 'An awesome git repository',
        homepage: 'https://owner.com/repo',
        language: 'ruby',
        stargazers_count: 77777
      now = Time.current

      expect(Time).to receive(:current).twice.and_return(now)
      expect(Star).to receive(:insert_all).with(
        [
          {
            name: star.full_name,
            github_url: star.html_url,
            description: star.description,
            homepage_url: star.homepage,
            language: star.language,
            stars_count: star.stargazers_count,
            created_at: now,
            updated_at: now
          }
        ]
      )

      Star.create_from_resources_collection([star])
    end
  end

  describe '.from_github' do
    it 'fetches up to Star::STARS_PER_LANGUAGE stars for each Star::LANGUAGES language from GitHub' do
      stub_const('Star::STARS_PER_LANGUAGE', 1)
      stub_const('Star::LANGUAGES', %i[ruby java])

      client = instance_double(Octokit::Client)

      ruby_stars = double('Resource', items: [{ full_name: 'owner/repo1' }])
      java_stars = double('Resource', items: [{ full_name: 'owner/repo2' }])

      expect(Octokit::Client).to receive(:new).and_return(client)
      expect(client).to receive(:search_repositories)
        .with(
          'language:ruby',
          sort: 'stars',
          order: 'desc',
          per_page: Star::STARS_PER_LANGUAGE
        )
        .and_return(ruby_stars)
      expect(client).to receive(:search_repositories)
        .with(
          'language:java',
          sort: 'stars',
          order: 'desc',
          per_page: Star::STARS_PER_LANGUAGE
        )
        .and_return(java_stars)

      returned_stars = Star.from_github

      expect(returned_stars).to eq(ruby_stars.items + java_stars.items)
    end
  end

  describe '#name' do
    context 'when it has not been initialized' do
      it 'returns nil' do
        expect(Star.new.name).to be_nil
      end
    end
  end

  describe '#github_url' do
    context 'when it has not been initialized' do
      it 'returns nil' do
        expect(Star.new.github_url).to be_nil
      end
    end
  end

  describe '#description' do
    context 'when it has not been initialized' do
      it 'returns nil' do
        expect(Star.new.description).to be_nil
      end
    end
  end

  describe '#homepage_url' do
    context 'when it has not been initialized' do
      it 'returns nil' do
        expect(Star.new.homepage_url).to be_nil
      end
    end
  end

  describe '#language' do
    context 'when it has not been initialized' do
      it 'returns nil' do
        expect(Star.new.language).to be_nil
      end
    end
  end

  describe '#stars_count' do
    context 'when it has not been initialized' do
      it 'returns nil' do
        expect(Star.new.stars_count).to be_nil
      end
    end
  end
end
