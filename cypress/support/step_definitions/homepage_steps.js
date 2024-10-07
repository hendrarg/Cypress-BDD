/// <reference types = "cypress"/>
import { Given } from "@badeball/cypress-cucumber-preprocessor";

const url = "https://www.webdriveruniversity.com/";
Given("I navigate to the webdriveruniversity home page", () => {
  cy.visit(url);
});
