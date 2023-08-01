/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    //Click on delete button
    IssueModal.clickDeleteButton();
    //Click on Delete button on confirmation pop-up
    IssueModal.confirmDeletion();
    //Check if issue is not visible on board
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
  });

  it('Should cancel deletion process successfully', () => {
    //Click on delete button
    IssueModal.clickDeleteButton();
    //Click on Cancel button on confirmation pop-up
<<<<<<< HEAD
    IssueModal.cancelDeletion();
    //Close the detailview and Check if issue is visible on board
=======
    IssueModal.cancelDeletion(issueTitle);
    //Close the detail view and Check if issue is visible on board
>>>>>>> aea6f63b6ded62d77c99c30896aada45521ff35e
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
  });
});