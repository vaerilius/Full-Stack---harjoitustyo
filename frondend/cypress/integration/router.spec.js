describe('react router tests', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.wait(500)
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
    describe('When user is going to sgn in', () => {
      it('when sign in with valid data should url to be /jobs', () => {
        cy.contains('Or Sign In').click()

        cy.get('#username').type('tttt')
        cy.get('#password').type('tttt')
        cy.contains('sign in').click()

        cy.location().should(loc => {
          expect(loc.href).to.eq('http://localhost:3000/jobs')
        })
      })
      it('when sign in with invalid data should url to be /', () => {
        cy.contains('Or Sign In').click()

        cy.get('#username').type('tttt')
        cy.get('#password').type('invalid')
        cy.contains('sign in').click()

        cy.location().should(loc => {
          expect(loc.href).to.eq('http://localhost:3000/login')
        })
      })

      
    })
  })
})
