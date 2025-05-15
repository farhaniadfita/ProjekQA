describe('POST Login', () => {
  it('should login successfully', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/login',
      headers: {
        'x-api-key': Cypress.env('apiKey')
      },
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('token')
    })
  })

  it('should fail login without password', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/login',
      headers: {
        'x-api-key': Cypress.env('apiKey')
      },
      body: {
        email: 'peter@klaven'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400)
    })
  })
})
