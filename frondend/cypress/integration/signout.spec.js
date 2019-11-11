describe('When logout', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')

    cy.contains('Or Sign In').click()
    cy.get('input:first')
      .type('timo')
    cy.get('input:last')
      .type('timo')
    cy.contains('sign in')
      .click()
    cy.contains('user timo signed in successfully')
  })
  it('user should logout', () => {
    cy.get('#logout').click()
    cy.contains('user logged out successfully')
    cy.contains('Job Book')
    
  })
  it('user should logout', () => {
    cy.get('#logout').click()
    cy.clearLocalStorage(/loggedUser/).then((ls) => {
      expect(ls.getItem('loggedUser')).to.be.null
    })
    
  })
})