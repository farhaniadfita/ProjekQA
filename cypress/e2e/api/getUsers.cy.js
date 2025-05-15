describe('GET List Users', () => {
  it('should return list of users', () => {
    cy.request('https://reqres.in/api/users?page=2')
      .then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('data')
      })
  })
})
