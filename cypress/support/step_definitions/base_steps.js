/// <reference types = "cypress"/>
import { After, Before, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.log("Executes before each scenario/test.");
  cy.clearAllLocalStorage();
});

// Before({ tags: "@smoke" }, () => {
//   cy.log("Executes before each scenario/test.");
//   cy.clearAllLocalStorage();
// });

After(() => {
  cy.log("Executes after each scenario/test.");
  cy.clearAllLocalStorage();
});

When("I wait for {int} seconds", (seconds) => {
  cy.wait(seconds * 10000);
});
