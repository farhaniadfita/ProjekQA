describe('DELETE User', () => {
  it('should delete the user', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'x-api-key': Cypress.env('apiKey')
      }
    }).then((res) => {
      expect(res.status).to.eq(204)
    })
  })
})
