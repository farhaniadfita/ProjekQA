describe('GET Single User', () => {
  it('should return user with id 2', () => {
    cy.request('https://reqres.in/api/users/2')
      .then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.data).to.have.property('id', 2)
      })
  })

  it('should return 404 for non-existent user', () => {
    cy.request({
      url: 'https://reqres.in/api/users/23',
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404)
    })
  })
})
