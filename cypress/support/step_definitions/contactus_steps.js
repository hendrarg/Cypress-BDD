/// <reference types = "cypress"/>
import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then("I type a first name", () => {
  cy.get('[name="first_name"]').type("Hendra");
});

Then("I type a last name", () => {
  cy.get('[name="last_name"]').type("Rizal");
});

Then("I enter email address", () => {
  cy.get('[name="email"]').type("hendrarg@mail.com");
});

Then("I enter a comment", () => {
  cy.get('textarea[name="message"]').type("Hello World!");
});

Then("I click submit button", () => {
  cy.get('[type="submit"]').click();
});

Then("I should be presented with a successful contact us submission message", () => {
  cy.get("h1").should("have.text", "Thank You for your Message!");
});

Then("I should be presented with a unsuccessful contact us submission message", () => {
  cy.get("body").contains("Error: Invalid email address");
});

Then("I type a first name {string}", (firstName) => {
  cy.get('[name="first_name"]').type(firstName);
});

Then("I type a last name {string}", (lastName) => {
  cy.get('[name="last_name"]').type(lastName);
});

Then("I type a email address {string}", (email) => {
  cy.get('[name="email"]').type(email);
});

Then("I type a specific word {string} and number {int} within the comment input field", (word, number) => {
  cy.get('textarea[name="message"]').type(word).type(number);
});

Then("I type a {word} and a {string}", (firstName, lastName) => {
  cy.get('[name="first_name"]').type(firstName);
  cy.get('[name="last_name"]').type(lastName);
});

Then("I type a {string} and a comment {string}", (email, comment) => {
  cy.get('[name="email"]').type(email);
  cy.get('textarea[name="message"]').type(comment);
});

Then("I should be presented with header text {string}", (message) => {
  cy.xpath("//h1 | //body").contains(message);
});
