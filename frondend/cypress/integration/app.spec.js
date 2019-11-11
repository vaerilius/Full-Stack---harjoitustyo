describe('Landing ', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Job Book')
    cy.contains('Sign Up')
    cy.contains('Or Sign In')
  })
  it('log in', function () {

    cy.contains('Or Sign In').click()
    cy.get('input:first')
      .type('timo')
    cy.get('input:last')
      .type('timo')
    cy.contains('sign in')
      .click()
      cy.contains('user timo signed in successfully')
  })


})