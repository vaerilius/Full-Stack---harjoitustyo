describe('When create new job ad', function () {
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

  it('when create new job ad ', function () {
    cy.url().should('eq', 'http://localhost:3000/jobs/')
    cy.contains('Create new').click()

    cy.get('#title').type('job ad from cypress test')
    cy.get('#company').type('cypress Oy')
    cy.get('#description').type('testing..')
    cy.contains('Submit').click()

    cy.contains('job ad from cypress test')
    cy.contains('Job job ad from cypress test added to job list')
  })

  it('when try to create with invalid data ', function () {

    // cy
    //   .get('.list-group').should('have.length', 7)
    //   .each(($li, index, $lis) => {
    //     return ''
    //   })
    //   .then(($lis) => {
    //     expect($lis).to.have.length(7) // true
    //   })
    cy.contains('Create new').click()

    cy.contains('Submit').click()

    cy.contains('Something went wrong, try again please!')

  })
})