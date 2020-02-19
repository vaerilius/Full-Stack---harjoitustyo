const signIn = password => {
  cy.contains('Or Sign In').click()

  cy.get('#username').type('tttt')
  cy.get('#password').type(password)
  cy.contains('sign in').click()

  cy.location().should(loc => {
    expect(loc.href).to.eq('http://localhost:3000/jobs')
  })
}
const logOut = () => {
  cy.clearLocalStorage()
}

describe('react router tests', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.wait(500)
    logOut()
  })

  describe('test router', () => {
    it('landing router', () => {
      cy.contains('Job Book')
      cy.location().should(loc => {
        expect(loc.hash).not.to.eq('#/users/123/edit/')
        expect(loc.host).to.eq('localhost:3000')
        expect(loc.hostname).to.eq('localhost')
        expect(loc.href).to.eq('http://localhost:3000/')
        expect(loc.pathname).to.eq('/')
        expect(loc.port).to.eq('3000')
        expect(loc.protocol).to.eq('http:')
      })
    })
    it('when navigate to sign up page should..', () => {
      cy.contains('Sign Up').click()
      cy.wait(500)
      cy.contains(
        'In Job Book employees can find open vacancies or if you are representing a job provider, you can manage job notifications'
      )

      cy.location().should(loc => {
        expect(loc.href).to.eq('http://localhost:3000/signup')
      })
    })
    it('when navigate to sign in page should..', () => {
      cy.contains('Or Sign In').click()
      cy.wait(500)
      cy.contains('To use application please, login')

      cy.location().should(loc => {
        expect(loc.href).to.eq('http://localhost:3000/login')
      })
    })
    describe('When user is going to sign in', () => {
      it('when sign in with valid data should url to be /jobs', () => {
        signIn('tttt')

        cy.location().should(loc => {
          expect(loc.href).to.eq('http://localhost:3000/jobs')
        })
      })
      // it('when sign in with invalid data should url to be /login', () => {
      //   signIn('invalidPassword')

      //   cy.location().should(loc => {
      //     expect(loc.href).to.eq('http://localhost:3000/')
      //   })
      // })

      describe('when user is signed in ', () => {
        beforeEach(() => {
          signIn('tttt')
        })
        it('when navigate to providers should', () => {
          cy.wait(500)
          cy.contains('Candidates').click()
          cy.location().should(loc => {
            expect(loc.href).to.eq('http://localhost:3000/candidates')
          })
        })
      })
    })
  })
})
