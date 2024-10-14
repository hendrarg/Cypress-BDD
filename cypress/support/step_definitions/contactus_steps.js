/// <reference types = "cypress"/>
import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import contat_us_po from "../page_objects/contact_us_po";

const contactUs = new contat_us_po();

When("I type a first name", () => {
  // cy.get('[name="first_name"]').type("Hendra");
  contactUs.type_firstName("Hendra");
});

When("I type a last name", () => {
  // cy.get('[name="last_name"]').type("Rizal");
  contactUs.type_lastName("Rizal");
});

When("I enter email address", () => {
  // cy.get('[name="email"]').type("hendrarg@mail.com");
  contactUs.type_email("hendrarg@mail.com");
});

When("I enter a comment", () => {
  // cy.get('textarea[name="message"]').type("Hello World!");
  contactUs.type_comment("Hello World!");
});

When("I click submit button", () => {
  // cy.get('[type="submit"]').click();
  contactUs.clickOn_submit_button();
});

Then("I should be presented with a successful contact us submission message", () => {
  // cy.get("h1").should("have.text", "Thank You for your Message!");
  contactUs.validate_submission_header("Thank You for your Message!");
});

Then("I should be presented with a unsuccessful contact us submission message", () => {
  // cy.get("body").contains("Error: Invalid email address");
  contactUs.validate_submission_header("Error: Invalid email address");
});

When("I type a first name {string}", (firstName) => {
  // cy.get('[name="first_name"]').type(firstName);
  contactUs.type_firstName(firstName);
});

When("I type a last name {string}", (lastName) => {
  // cy.get('[name="last_name"]').type(lastName);
  contactUs.type_lastName(lastName);
});

When("I type a email address {string}", (email) => {
  // cy.get('[name="email"]').type(email);
  contactUs.type_email(email);
});

When("I type a specific word {string} and number {int} within the comment input field", (word, number) => {
  // cy.get('textarea[name="message"]').type(word).type(number);
  contactUs.type_comment(word + " " + number);
});

When("I type a {word} and a {string}", (firstName, lastName) => {
  // cy.get('[name="first_name"]').type(firstName);
  // cy.get('[name="last_name"]').type(lastName);
  contactUs.type_firstName(firstName);
  contactUs.type_lastName(lastName);
});

When("I type a {string} and a comment {string}", (email, comment) => {
  // cy.get('[name="email"]').type(email);
  // cy.get('textarea[name="message"]').type(comment);
  contactUs.type_email(email);
  contactUs.type_comment(comment);
});

Then("I should be presented with header text {string}", (message) => {
  // cy.xpath("//h1 | //body").contains(message);
  contactUs.validate_submission_header(message);
});
