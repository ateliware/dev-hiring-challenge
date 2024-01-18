/// <reference types="cypress" />

describe('Basic E2E tests', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.contains('Puxar repositórios').click()
  })

  it('should load page and select a language successfully', () => {

    const language = 'JavaScript'

    cy.get('.chosen-container').contains(language).should('not.exist')

    cy.get('select').select(language)

    cy.get('.chosen-container').contains(language).should('be.visible')


  })

  it('should delete a language successfully', () => {

    const language = 'Ruby'

    cy.get('select').select(language)

    cy.get('.chosen-container').contains(language).should('be.visible')

    cy.get('.chosen-container').get('.chosen-language').get('.unchoose').click()

    cy.get('.chosen-container').contains(language).should('not.exist')

  })


  it('select a language and load repos', () => {

    const language = 'Elixir'

    cy.get('select').select(language)

    cy.get('.repository-cards').should('not.exist')

    cy.contains('Puxar repositórios').click()

    cy.get('.repository-cards').get('.repository-card').should('be.visible')

  })  

})