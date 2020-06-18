describe('initPage', function () {

    it('Assert the redirect go to the correctly page', () => {
        cy.visit('/GitHub')
        cy.get('[data-cy=listButton]').click();
        cy.request('localhost/GitHub/repository/create')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
        cy.get('[data-cy=subtitle]').should('contain', 'Repositories avaible');
    });

    it('Assert that list of repositories render correctly', () => {
       cy.get('.table.table-bordered').find('th')
           .then(($th) => {
              expect($th[0]).to.have.text('Repository name')
               expect($th[1]).to.have.text('Start Date')
               expect($th[2]).to.have.text('Number of stars')
               expect($th[3]).to.have.text('Language')
               expect($th[4]).to.have.text('View')
           });
    });

    it('Assert that page list all the repositories', () => {
        cy.get('.table.table-bordered').find('[data-cy=tableLine]')
            .should(($tableLine) => {
                let lines = $tableLine.map((i, el) =>
                    Cypress.$(el).text())
                lines = lines.get();
                expect(lines).to.have.length(5)
            });
    });

    it('Assert that request to view one repository is equals a 200 status code', () => {
        cy.get('.table.table-bordered').find('a')
            .then(($a) => {
               $a[0].click();
            });

        cy.request('localhost/GitHub/repository/view_repository/*')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    });

    it('Assert that info of one repository render correctly', () => {
        cy.get('h1').should('contain', 'Repository Info');
        cy.get('.table').find('th')
            .then(($th) => {
                expect($th[0]).to.have.text('Repository name')
                expect($th[1]).to.have.text('Description')
                expect($th[2]).to.have.text('Number of stars')
                expect($th[3]).to.have.text('Created at')
                expect($th[4]).to.have.text('Address')
                expect($th[5]).to.have.text('Homepage')
            });
    });

});
