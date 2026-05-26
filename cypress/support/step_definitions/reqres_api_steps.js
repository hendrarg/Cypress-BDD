/// <reference types="cypress" />
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I login via API with email {string} and password {string}", (email, password) => {
  cy.reqresLogin(email, password).as("lastResponse");
});

When("I get the list of users via API", () => {
  cy.reqresListUsers().as("lastResponse");
});

When("I get user {int} via API", (userId) => {
  cy.reqresSingleUser(userId).as("lastResponse");
});

When("I update user {int} with name {string} and job {string} via API", (userId, name, job) => {
  cy.reqresUpdateUser(userId, name, job).as("lastResponse");
});

When("I delete user {int} via API", (userId) => {
  cy.reqresDeleteUser(userId).as("lastResponse");
});

When("I get the list of resources via API", () => {
  cy.reqresListResources().as("lastResponse");
});

When("I get products at page {int} via API", (page) => {
  cy.reqresGenericResource(page).as("lastResponse");
});

Then("the response status code is {int}", (statusCode) => {
  cy.get("@lastResponse").its("status").should("eq", statusCode);
});

Then("the response body has key {string}", (key) => {
  cy.get("@lastResponse").its("body").should("have.property", key);
});

Then("the response user data has first_name {string}", (firstName) => {
  cy.get("@lastResponse").its("body.data.first_name").should("eq", firstName);
});
