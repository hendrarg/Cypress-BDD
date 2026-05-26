// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("clickAndOpenLink_InSameTab", (selector) => {
  cy.get(selector).invoke("removeAttr", "target").click();
});

// ── Reqres API Commands ──────────────────────────────────────────────────────

Cypress.Commands.add("reqresLogin", (email, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/api/login`,
    headers: {
      "x-api-key": Cypress.env("apiKey"),
      "Content-Type": "application/json",
    },
    body: { email, password },
  });
});

Cypress.Commands.add("reqresListUsers", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiUrl")}/api/users`,
    headers: { "x-api-key": Cypress.env("apiKey") },
  });
});

Cypress.Commands.add("reqresSingleUser", (userId) => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiUrl")}/api/users/${userId}`,
    headers: { "x-api-key": Cypress.env("apiKey") },
  });
});

Cypress.Commands.add("reqresUpdateUser", (userId, name, job) => {
  cy.request({
    method: "PUT",
    url: `${Cypress.env("apiUrl")}/api/users/${userId}`,
    headers: {
      "x-api-key": Cypress.env("apiKey"),
      "Content-Type": "application/json",
    },
    body: { name, job },
  });
});

Cypress.Commands.add("reqresDeleteUser", (userId) => {
  cy.request({
    method: "DELETE",
    url: `${Cypress.env("apiUrl")}/api/users/${userId}`,
    headers: { "x-api-key": Cypress.env("apiKey") },
  });
});

Cypress.Commands.add("reqresListResources", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiUrl")}/api/unknown`,
    headers: { "x-api-key": Cypress.env("apiKey") },
  });
});

Cypress.Commands.add("reqresGenericResource", (page = 1) => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiUrl")}/api/products`,
    headers: { "x-api-key": Cypress.env("apiKey") },
    qs: { page },
  });
});
