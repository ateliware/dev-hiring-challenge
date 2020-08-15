describe('Black box tests', () => {
    it('Should contain the button', () => {
        cy.visit("/")

        cy.contains('See repositories')
    })

    it('Should change page', () => {
        cy.visit("/")

        cy.contains('See repositories').click()

        cy.contains("We've found 15 relevant repositories")

        cy.get("b")
        cy.get("a")
        cy.get("p")
    })
})