describe('POST Register', () => {
  it('should register a user successfully', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      headers: {
        'x-api-key': Cypress.env('apiKey')
      },
      body: {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('token')
    })
  })

  it('should fail registration without password', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      headers: {
        'x-api-key': Cypress.env('apiKey')
      },
      body: {
        email: 'sydney@fife'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400)
    })
  })
})
