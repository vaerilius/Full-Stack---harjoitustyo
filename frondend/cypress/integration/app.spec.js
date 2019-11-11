describe('Landing ', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Job Book')
    cy.contains('Sign Up')
    cy.contains('Or Sign In')
  })
  it('when sign up valid data', () => {
    cy.contains('Sign Up').click()
    cy.get('#name')
      .type('timo')
    cy.get('#username')
      .type('timo')
    cy.get('#password')
      .type('timo')
    cy.get('#picture')
      .type('picture')
    cy.get('#gridCheck')
      .click()
    cy.contains('Sign up')
      .click()
    cy.contains('user: timo signed Up successfully')

  })
  it('when sign up invalid data', () => {
    cy.contains('Sign Up').click()
    cy.get('#name')
      .type('')
    cy.get('#username')
      .type('')
    cy.get('#password')
      .type('')
    cy.get('#picture')
      .type('')
    cy.contains('Sign up')
      .click()
    cy.contains('ValidationError')

  })
  it('log in with current data', function () {

    cy.contains('Or Sign In').click()
    cy.get('input:first')
      .type('timo')
    cy.get('input:last')
      .type('timo')
    cy.contains('sign in')
      .click()
    cy.contains('user timo signed in successfully')
    cy.clearLocalStorage(/jotain/).then((ls) => {
      expect(ls.getItem('loggedUser')).to.be.not.null
    })
  })

  it('login whit wrong login data', function () {
    cy.contains('Or Sign In').click()
    cy.get('input:first')
      .type('wrong')
    cy.get('input:last')
      .type('password')
    cy.contains('sign in')
      .click()
    cy.contains('invalid username or password')

  })



})