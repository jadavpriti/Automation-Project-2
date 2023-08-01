describe('Time tracking functionalities', () => {

    it('Should add and update estimation time and time log', () => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            //System will already open issue creating modal in beforeEach block
            cy.visit(url + '/board?modal-issue-create=true');
        });
        cy.get('[data-testid="modal:issue-create"]').within(() => {
        //Filling mandatory fields and creating Issue
        cy.get('.ql-editor').type('My bug description');
        cy.get('input[name="title"]').type('Bug');
        cy.get('button[type="submit"]').click();
        });
        //Check if issue is created successfully
        cy.get('[data-testid="modal:issue-create"]').should('not.exist');
        cy.contains('Issue has been successfully created.').should('be.visible');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
        //Assert that this list contains 5 issues and first element with tag p has specified text
        cy.get('[data-testid="list-issue"]')
                .should('have.length', '5')
                .first()
                .find('p')
                .contains('Bug');
        });
        //Open created issue's detail view and check if no time is logged
        cy.contains('Bug').click();
        cy.contains('No time logged').should('exist');
        //Add value 10 to “Original estimate (hours)” field
        cy.get('input[placeholder="Number"]').click().type("value=10");
        cy.contains('Original Estimate (hours)').click();
        cy.get('[placeholder="Number"]').should("have.value", "10");
        //Close detail view and open the issue again to check that original estimation is saved
        cy.get('button i[data-testid="icon:close"]').click();
        cy.contains('Bug').click();
        cy.contains("10h estimated").should("exist");

        //remove value 10 to “Original estimate (hours)” field and add new value 20
        cy.get('input[placeholder="Number"]').click().clear("value=10").type("value=20");
        cy.contains('Original Estimate (hours)').click();
        cy.get('[placeholder="Number"]').should("have.value", "20");
        //Close detail view and open the issue again to check that updated estimation is saved
        cy.get('button i[data-testid="icon:close"]').click();
        cy.contains('Bug').click();
        cy.contains("20h estimated").should("exist");

        //remove value 20 to “Original estimate (hours)” field 
        cy.get('input[placeholder="Number"]').click().clear("value=20");
        cy.contains('Original Estimate (hours)').click();
        cy.get('button i[data-testid="icon:close"]').click();
        cy.contains('Bug').click();
        cy.contains('No time logged').should('exist');

        //Log time
        //Click on time tracking and see that pop-up dialouge is visible
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');

        //enter the values in time spent and time remaining
        cy.get('input[placeholder="Number"]').eq(1).clear().type('2{enter}');
        cy.get('input[placeholder="Number"]').eq(2).clear().type('5{enter}');
        cy.get('[data-testid="modal:tracking"]').contains('Done').click();

        //Spent time number and time remaining are visible in the time tracking section
        cy.get('[data-testid="icon:stopwatch"]').next().should('contain', '2h logged')
            .should('not.contain', 'No time logged').and('contain', '5h remaining');
        
        //Click on time tracking and see that pop-up dialouge is visible
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');

        //remove the values in time spent and time remaining
        cy.get('input[placeholder="Number"]').eq(1).clear();
        cy.get('input[placeholder="Number"]').eq(2).clear();
        cy.get('[data-testid="modal:tracking"]').contains('Done').click();

        //No time logged is visible in the time tracking section
        cy.get('[data-testid="icon:stopwatch"]').next().should('contain', 'No time logged')
            .should('not.contain', '2h logged').and('not.contain', '5h remaining');
    });
    });
