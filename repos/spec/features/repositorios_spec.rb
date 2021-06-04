require 'rails_helper'

RSpec.feature "Repositorios", type: :feature do
  it 'should list all repositorios' do
    visit('/repositorios')
    expect(find('form.button_to')).to have_css('input#create_repos')
    expect(page).to have_css('#card-body-content-repos')
  end

  context 'when button create repos is clicked' do
    # 25 objects because of the default param in kaminari paginate :page
    it 'should return and list 1 to 25 objects' do
      visit('/repositorios')
      find('input#create_repos').click
      using_wait_time 2 do
        expect(page).to have_current_path(repositorios_path)
        expect(page).to have_selector('#card-body-content-repos .row.node-repo-element', between: 1..25)
      end
    end
  end

  context 'when click to show repo' do
    it 'should open the repo details page' do
      visit('/repositorios')
      show_path = find('#card-body-content-repos > div:nth-child(1) > div > div > div > div.col-md-2.d-flex.align-items-center.justify-content-lg-between > a')[:href]
      find('#card-body-content-repos > div:nth-child(1) > div > div > div > div.col-md-2.d-flex.align-items-center.justify-content-lg-between > a').click
      using_wait_time 1 do
        expect(page).to have_selector(:link_or_button, 'Voltar')
        expect(page).to have_current_path(show_path)
        expect(page).to have_selector('#card-body-repo-detail')
      end
    end

  end
end
