describe('Automation API Reqres.in', () => {
  const baseUrl = 'https://reqres.in/api';
  const headers = {
    'x-api-key': 'reqres-free-v1'
  };

  
  it('GET - List Users', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=2`,
      headers
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
    });
  });

  
  it('GET - Single User', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/2`,
      headers
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.eq(2);
    });
  });

  
  it('GET - Single User Not Found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/23`,
      headers,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  
  it('POST - Create User', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers,
      body: {
        name: 'Farhani',
        job: 'QA'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'Farhani');
    });
  });

  
  it('PUT - Update User', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      headers,
      body: {
        name: 'Farhani Update',
        job: 'QA Senior'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'Farhani Update');
    });
  });

  
  it('PATCH - Update User', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users/2`,
      headers,
      body: {
        job: 'QA Lead'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('job', 'QA Lead');
    });
  });

  
  it('DELETE - Delete User', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      headers
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  
  it('POST - Register Successful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers,
      body: {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  
  it('POST - Register Unsuccessful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers,
      failOnStatusCode: false,
      body: {
        email: 'sydney@fife'
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  
  it('POST - Login Successful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers,
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  
  it('POST - Login Unsuccessful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers,
      failOnStatusCode: false,
      body: {
        email: 'peter@klaven'
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  
  it('GET - Delayed Response', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?delay=3`,
      headers
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
    });
  });
});
