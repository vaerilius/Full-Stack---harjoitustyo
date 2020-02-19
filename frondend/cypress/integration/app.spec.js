describe('Landing ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.wait(500)
  })

  it('front page can be opened', function() {
    cy.contains('Job Book')
    cy.contains('Sign Up')
    cy.contains('Or Sign In')
  })
  it('when sign up valid data', () => {
    cy.contains('Sign Up').click()
    cy.wait(500)
    cy.get('#name').type('timo')
    cy.get('#username').type('timo')
    cy.get('#password').type('timo')
    // cy.fixture('../../src/assest/bg.jpg')
    //   .as('logo')
    //   .get('input[type=file]')
    //   .then(function(el) {
    //     return Cypress.Blob.base64StringToBlob(this.logo, 'image/jpg').then(
    //       blob => {
    //         el[0].files[0] = blob
    //         el[0].dispatchEvent(new Event('change', { bubbles: true }))
    //       }
    //     )
    //   })
    cy.get('#gridCheck').click()
    // cy.contains('Sign up').click()
    // cy.contains('user: timo signed Up successfully')
  })
  // it('when sign up invalid data', () => {
  //   cy.contains('Sign Up').click()
  //   cy.wait(500)

  //   cy.get('#name').type('')
  //   cy.get('#username').type('')
  //   cy.get('#password').type('')
  //   cy.get('#picture').type('')
  //   cy.contains('Sign up').click()
  //   cy.contains('ValidationError')
  // })

  describe('logging', function() {
    describe('sign in and sign out', function() {
      it('log in with current data and logout', function() {
        cy.contains('Or Sign In').click()
        cy.wait(500)

        cy.get('input:first').type('tttt')
        cy.get('input:last').type('tttt')
        cy.contains('sign in').click()
        cy.wait(1000)

        cy.contains('user tttt signed in successfully')
        cy.clearLocalStorage(/jotain/).then(ls => {
          expect(ls.getItem('loggedUser')).to.be.not.null

          // and logout
          cy.get('#logout').click()
          cy.wait(1000)
          // cy.contains('Or Sign In').click()
        })
      })
      it('login whit wrong login data', function() {
        cy.contains('Or Sign In').click()
        cy.get('input:first').type('wrong')
        cy.get('input:last').type('password')
        cy.contains('sign in').click()
        cy.contains('invalid username or password')
      })
    })
  })
})
