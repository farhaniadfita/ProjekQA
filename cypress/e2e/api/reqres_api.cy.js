describe('Automation API Reqres.in', () => {
  const baseUrl = 'https://reqres.in/api';

  // GET list users
  it('GET - List Users', () => {
    cy.request(`${baseUrl}/users?page=2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
    });
  });

  // GET single user
  it('GET - Single User', () => {
    cy.request(`${baseUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.eq(2);
    });
  });

  // GET single user not found
  it('GET - Single User Not Found', () => {
    cy.request({
      url: `${baseUrl}/users/23`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  // POST - Create User
  it('POST - Create User', () => {
    cy.request('POST', `${baseUrl}/users`, {
      name: 'Farhani',
      job: 'QA'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'Farhani');
    });
  });

  // PUT - Update User
  it('PUT - Update User', () => {
    cy.request('PUT', `${baseUrl}/users/2`, {
      name: 'Farhani Update',
      job: 'QA Senior'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'Farhani Update');
    });
  });

  // PATCH - Update User
  it('PATCH - Update User', () => {
    cy.request('PATCH', `${baseUrl}/users/2`, {
      job: 'QA Lead'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('job', 'QA Lead');
    });
  });

  // DELETE - Delete User
  it('DELETE - Delete User', () => {
    cy.request('DELETE', `${baseUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  // POST - Register (successful)
  it('POST - Register Successful', () => {
    cy.request('POST', `${baseUrl}/register`, {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  // POST - Register (unsuccessful)
  it('POST - Register Unsuccessful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      failOnStatusCode: false,
      body: {
        email: 'sydney@fife'
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  // POST - Login (successful)
  it('POST - Login Successful', () => {
    cy.request('POST', `${baseUrl}/login`, {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  // POST - Login (unsuccessful)
  it('POST - Login Unsuccessful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      body: {
        email: 'peter@klaven'
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  // GET - Delayed Response
  it('GET - Delayed Response', () => {
    cy.request(`${baseUrl}/users?delay=3`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
    });
  });
});
