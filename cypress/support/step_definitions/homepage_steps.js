/// <reference types = "cypress"/>
import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
// import base_po from "../page_objects/base_po";
import homePage_po from "../page_objects/homePage_po";
// const url = "https://www.webdriveruniversity.com/";

// const basePage = new base_po();
const homePage = new homePage_po();

Given("I navigate to the webdriveruniversity home page", () => {
  // cy.visit(url);
  // basePage.navigate("");
  homePage.navigate("");
});

When("I click on the contact us button", () => {
  // cy.get("#contact-us").invoke("removeAttr", "target").click();
  // cy.clickAndOpenLink_InSameTab("#contact-us");
  homePage.clickOn_contacuUs_button();
});

When("I click on the login portal button", () => {
  // cy.get("#login-portal").invoke("removeAttr", "target").click();
  // cy.clickAndOpenLink_InSameTab("#login-portal");
  homePage.clickOn_login_button();
});
