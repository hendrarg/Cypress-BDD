---
name: automation-cypress
description: >
  Skill untuk test automation menggunakan Cypress (TypeScript/JavaScript).
  Gunakan skill ini ketika user bekerja di project Cypress — membuat test case,
  Page Object Model, custom commands, API test, intercept network, atau bertanya
  tentang best practices Cypress. Trigger pada: "cypress test", "buat POM cypress",
  "cy.request", "custom command", "intercept cypress", "cy.session", "fixture cypress",
  "buatkan test", "buat spec", "cypress e2e".
---

# Cypress Automation Skill

## Core Principles

1. **POM wajib** — locator dan aksi di Page Object, bukan inline di test
2. **Stable selectors** — `data-testid` > `aria/role` > `label` > `id` > CSS > XPath
3. **Tidak pernah `cy.wait(ms)`** — pakai assertions sebagai implicit wait
4. **Login via API** — gunakan `cy.loginByApi()` + `cy.session()`, bukan UI login setiap test
5. **Custom commands** — logic yang berulang masuk `commands.ts`, bukan copy-paste di test
6. **Env config** — URL dan credentials di `cypress.env.json` atau environment variables

---

## Project Structure

```
project-root/
├── cypress.config.ts
├── cypress.env.json          # gitignore — credentials lokal
├── cypress/
│   ├── e2e/
│   │   ├── web/
│   │   │   └── login.cy.ts
│   │   └── api/
│   │       └── users.cy.ts
│   ├── pages/                # Page Object Models
│   │   ├── login.page.ts
│   │   └── dashboard.page.ts
│   ├── support/
│   │   ├── commands.ts       # Custom commands
│   │   └── e2e.ts            # Global setup
│   └── fixtures/
│       └── users.json
```

---

## cypress.config.ts

```typescript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL ?? 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    screenshotOnRunFailure: true,
    video: false,
    retries: { runMode: 2, openMode: 0 },
    env: {
      apiUrl: process.env.API_URL ?? 'http://localhost:3000/api',
    },
  },
});
```

---

## Page Object

Cypress tidak pakai `async/await` — semua command adalah chain yang queued.

```typescript
// cypress/pages/login.page.ts
export class LoginPage {
  // Locators sebagai getter — lazy, tidak execute sampai dipanggil
  get emailInput()    { return cy.getByTestId('email-input'); }
  get passwordInput() { return cy.getByTestId('password-input'); }
  get submitButton()  { return cy.getByRole('button', { name: 'Login' }); }
  get errorMessage()  { return cy.getByTestId('error-message'); }

  visit() {
    cy.visit('/login');
    return this;
  }

  login(email: string, password: string) {
    this.emailInput.clear().type(email);
    this.passwordInput.clear().type(password);
    this.submitButton.click();
    return this;
  }

  expectError(message: string) {
    this.errorMessage.should('contain.text', message);
    return this;
  }

  expectLoginPageVisible() {
    this.submitButton.should('be.visible');
    return this;
  }
}
```

---

## Custom Commands

```typescript
// cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      loginByApi(email: string, password: string): Chainable<void>;
      loginAsUser(): Chainable<void>;
      loginAsAdmin(): Chainable<void>;
    }
  }
}

// Shortcut selector
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Login via API — jauh lebih cepat dari UI
Cypress.Commands.add('loginByApi', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/login`,
    body: { email, password },
  }).then(({ body }) => {
    window.localStorage.setItem('auth-token', body.token);
    if (body.sessionId) cy.setCookie('session', body.sessionId);
  });
});

Cypress.Commands.add('loginAsUser', () => {
  cy.loginByApi(Cypress.env('TEST_EMAIL'), Cypress.env('TEST_PASSWORD'));
});

Cypress.Commands.add('loginAsAdmin', () => {
  cy.loginByApi(Cypress.env('ADMIN_EMAIL'), Cypress.env('ADMIN_PASSWORD'));
});
```

---

## Global Setup

```typescript
// cypress/support/e2e.ts
import './commands';

// Login sekali per suite — pakai cy.session untuk cache
beforeEach(() => {
  cy.session('user-session', () => {
    cy.loginAsUser();
  });
});
```

---

## Web Test

```typescript
// cypress/e2e/web/login.cy.ts
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';

describe('Login', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    // Override session untuk test login — butuh fresh state
    cy.clearCookies();
    cy.clearLocalStorage();
    loginPage.visit();
  });

  context('Successful login', () => {
    it('should redirect to dashboard when valid credentials provided', () => {
      loginPage.login(Cypress.env('TEST_EMAIL'), Cypress.env('TEST_PASSWORD'));
      cy.url().should('include', '/dashboard');
      dashboardPage.welcomeMessage.should('be.visible');
    });
  });

  context('Failed login', () => {
    it('should show error when invalid password provided', () => {
      loginPage.login(Cypress.env('TEST_EMAIL'), 'wrong-password');
      loginPage.expectError('Invalid credentials');
    });

    it('should show validation when email field empty', () => {
      loginPage.submitButton.click();
      cy.contains('Email is required').should('be.visible');
    });
  });
});
```

---

## API Test (via cy.request)

```typescript
// cypress/e2e/api/users.cy.ts
describe('Users API', () => {
  let token: string;

  before(() => {
    cy.request('POST', `${Cypress.env('apiUrl')}/auth/login`, {
      email: Cypress.env('TEST_EMAIL'),
      password: Cypress.env('TEST_PASSWORD'),
    }).then(({ body }) => {
      token = body.token;
    });
  });

  it('should return user list with status 200', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/users`,
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.data).to.be.an('array');
      expect(body.data).to.have.length.greaterThan(0);
    });
  });

  it('should create user and return 201', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/users`,
      headers: { Authorization: `Bearer ${token}` },
      body: {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        role: 'viewer',
      },
    }).then(({ status, body }) => {
      expect(status).to.eq(201);
      expect(body).to.have.property('id');
    });
  });

  it('should return 404 when user not found', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/users/99999`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,   // penting — agar Cypress tidak auto-fail di 4xx
    }).then(({ status }) => {
      expect(status).to.eq(404);
    });
  });
});
```

---

## Useful Patterns

### Intercept Network
```typescript
// Mock response
cy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers');
cy.visit('/users');
cy.wait('@getUsers');

// Spy — validasi request yang terjadi
cy.intercept('POST', '/api/login').as('loginRequest');
cy.getByTestId('submit').click();
cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
```

### Retry-ability (built-in Cypress)
```typescript
// Cypress auto-retry sampai timeout — tidak perlu explicit wait
cy.getByTestId('loading').should('not.exist');           // tunggu hilang
cy.getByTestId('table-row').should('have.length', 5);   // tunggu data muncul
cy.url().should('include', '/dashboard');               // tunggu redirect
```

### Selector Priority
```typescript
cy.getByTestId('submit-btn')                          // 1. data-testid — BEST
cy.getByRole('button', { name: 'Save' })              // 2. aria role — Cypress 12+
cy.get('[data-testid="submit-btn"]')                  // 1. manual data-testid
cy.contains('button', 'Save')                         // 3. text — OK
cy.get('#submit')                                     // 4. id — OK
cy.get('.btn-primary')                                // 5. CSS — AVOID
cy.get('form > div:nth-child(2) > button')            // 6. XPath-style — LAST RESORT
```

### cypress.env.json (gitignore)
```json
{
  "TEST_EMAIL": "tester@example.com",
  "TEST_PASSWORD": "secret123",
  "ADMIN_EMAIL": "admin@example.com",
  "ADMIN_PASSWORD": "admin123",
  "apiUrl": "http://localhost:3000/api"
}
```
