// Denne test tester login-funktionen i users.controller.js
const { expect } = require('chai');
const { login } = require('../controllers/users.controller.js'); // Angiv stien til login-filen her



describe('Login', function () {
  // Rigtigt brugernavn og adgangskode
  it('Skal returnere success hvis brugernavn og adgangskode er rigtig', async function () {
    const req = {
      body: {
        username: 'gustavzeuthen',
        password: '123'
      },
      session: {}
    };

    const res = {
      json(data) {
        this.data = data;
      }
    };

    await login(req, res);

    expect(res.data).to.deep.equal({ success: true });
  });
  // rigtigt brugernavn og forkert adgangskode
  it('Skal returnere en error hvis brugernavn er rigtigt men forkert adgangskode', async function () {
    const req = {
      body: {
        username: 'gustavzeuthen',
        password: '456'
      },
      session: {}
    };

    const res = {
      json(data) {
        this.data = data;
      }
    };

    await login(req, res);

    expect(res.data).to.deep.equal({ error: 'Forkert brugernavn eller adgangskode' });
  });

  // rigtig adgangskode og forkert brugernavn
  it('Skal returnere en error hvis brugernavn er forkert men adgangskode er rigtig', async function () {
    const req = {
      body: {
        username: 'oleolesen',
        password: '123'
      },
      session: {}
    };

    const res = {
      json(data) {
        this.data = data;
      }
    };

    await login(req, res);

    expect(res.data).to.deep.equal({ error: 'Forkert brugernavn eller adgangskode' });
  });

  // forkert adgangskode og forkert brugernavn
  it('Skal returnere en fejl hvis både adgangskode og brugernavn er forkert', async function () {
    const req = {
      body: {
        username: 'oleolesen',
        password: '456'
      },
      session: {}
    };

    const res = {
      json(data) {
        this.data = data;
      }
    };

    await login(req, res);

    expect(res.data).to.deep.equal({ error: 'Forkert brugernavn eller adgangskode' });
  });
});


