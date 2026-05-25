# Generate API Method

## Overview
Membuat method `cy.request()` untuk kebutuhan precondition atau API test di project Cypress BDD (JavaScript).

## Kapan Digunakan
- Test case butuh precondition lewat API (login via API, seed data, dll.)
- Ada curl yang perlu dikonversi ke `cy.request()` Cypress
- Membuat API test langsung (tanpa UI)

## To Do List

- [ ] **Analisis curl atau dokumentasi API** yang diberikan user
- [ ] **Tentukan lokasi penyimpanan method**
  - Precondition umum (login, auth) → tambahkan ke `cypress/support/commands.js` sebagai `Cypress.Commands.add()`
  - Helper spesifik per fitur → buat file di `cypress/support/` atau `cypress/fixtures/`
  - Payload/data request → simpan di `cypress/fixtures/` sebagai `.json`
- [ ] **Buat method `cy.request()`** berdasarkan curl
  - Gunakan `Cypress.env('apiUrl')` untuk base URL
  - Tangani response (token, cookie, data) dan teruskan jika dibutuhkan step berikutnya
  - Set `failOnStatusCode: false` jika skenario menguji error response (4xx/5xx)
- [ ] **Daftarkan ke step definitions** jika dipakai sebagai precondition di `.feature`

## Pola Konversi curl → cy.request()

### curl contoh
```bash
curl -X POST https://api.example.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "secret"}'
```

### Hasil cy.request()
```javascript
// cypress/support/commands.js
Cypress.Commands.add("loginByApi", (username, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/auth/login`,
    headers: { "Content-Type": "application/json" },
    body: { username, password },
  }).then(({ body }) => {
    window.localStorage.setItem("auth-token", body.token);
  });
});
```

### Penggunaan di Step Definition
```javascript
// cypress/support/step_definitions/base_steps.js
Given("I am logged in as {string}", (role) => {
  const email = Cypress.env(`${role.toUpperCase()}_EMAIL`);
  const password = Cypress.env(`${role.toUpperCase()}_PASSWORD`);
  cy.loginByApi(email, password);
});
```

### Payload di Fixture
```javascript
// cypress/fixtures/create_user_payload.json
{
  "name": "Test User",
  "email": "test@example.com",
  "role": "viewer"
}

// Penggunaan di test
cy.fixture("create_user_payload").then((payload) => {
  cy.request("POST", `${Cypress.env("apiUrl")}/users`, payload);
});
```

## Catatan

- URL dan credentials wajib dari `Cypress.env()` — jangan hardcode
- Gunakan `cy.session()` di `commands.js` untuk cache login agar tidak login ulang tiap test
- Untuk API test (bukan precondition), buat file `cypress/e2e/api/<nama>.cy.js` terpisah dari `.feature`
