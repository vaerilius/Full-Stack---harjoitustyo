const attachFiles = require('cypress-form-data-with-file-upload')
import 'cypress-file-upload'
describe('When create new job ad', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.wait(500)
    cy.contains('Or Sign In').click()
    cy.wait(500)
    cy.get('input:first').type('tttt')
    cy.get('input:last').type('tttt')
    cy.contains('sign in').click()
    cy.wait(500)
    cy.contains('Jobs')
    // cy.get('.list-group.mb-2:first').click()
  })

  describe('when addition a new job ad', function() {
    it('when add  new job ad', async () => {
      // let items = 0
      // cy.get('.list-group-item')
      //   .contains('some')
      //   .then((some, i) => {
      //     items = i
      //   })

      cy.contains('Create new job advertisement').click()
      cy.get('#title')
        .type('some title')
        .invoke('val')
        .then(val => expect(val).contains('some title'))
      cy.get('#company')
        .type('some company')
        .invoke('val')
        .then(val => expect(val).contains('some company'))
      cy.get('#description')
        .type('some description')
        .invoke('val')
        .then(val => expect(val).contains('some description'))

      const fileName = '../../src/assest/bg.jpg'

      cy.fixture(fileName).then(fileContent => {
        cy.get('#jobFile').upload({
          fileContent,
          fileName,
          mimeType: 'image/jpeg'
        })
      })

      cy.contains('Submit').click()

      cy.get('.list-group-item')
        .contains('some')
        .then(some => console.log(some))
    })
  })
})
