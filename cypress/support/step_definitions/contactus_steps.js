/// <reference types = "cypress"/>
import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import contat_us_po from "../page_objects/contact_us_po";

const contactUs = new contat_us_po();

When("I type a first name", () => {
  contactUs.type_firstName("Hendra");
});

When("I type a last name", () => {
  contactUs.type_lastName("Rizal");
});

When("I enter email address", () => {
  contactUs.type_email("hendrarg@mail.com");
});

When("I enter a comment", () => {
  contactUs.type_comment("Hello World!");
});

When("I click submit button", () => {
  contactUs.clickOn_submit_button();
});

Then("I should be presented with a successful contact us submission message", () => {
  contactUs.validate_submission_header("Thank You for your Message!");
});

Then("I should be presented with a unsuccessful contact us submission message", () => {
  contactUs.validate_submission_header("Error: Invalid email address");
});

When("I type a first name {string}", (firstName) => {
  contactUs.type_firstName(firstName);
});

When("I type a last name {string}", (lastName) => {
  contactUs.type_lastName(lastName);
});

When("I type a email address {string}", (email) => {
  contactUs.type_email(email);
});

When("I type a specific word {string} and number {int} within the comment input field", (word, number) => {
  contactUs.type_comment(word + " " + number);
});

When("I type a {word} and a {string}", (firstName, lastName) => {
  contactUs.type_firstName(firstName);
  contactUs.type_lastName(lastName);
});

When("I type a {string} and a comment {string}", (email, comment) => {
  contactUs.type_email(email);
  contactUs.type_comment(comment);
});

Then("I should be presented with header text {string}", (message) => {
  contactUs.validate_submission_header(message);
});
