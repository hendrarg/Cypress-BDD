/// <reference types = "cypress"/>
import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import login_po from "../page_objects/login_po";

const loginPage = new login_po();
let stub;

Given("I navigate to the webdriveruniversity login page", () => {
  loginPage.navigateTo_login_page("");
});

When("I type a username {}", (username) => {
  // cy.get("#text").type(username);
  loginPage.type_userName(username);
});

When("I type a password {}", (password) => {
  // cy.get("#password").type(password);
  loginPage.type_password(password);
});

When("I click on the login button", () => {
  stub = cy.stub();
  cy.on("window:alert", stub);
  // cy.get("#login-button").click();
  loginPage.clickOn_login_button();
});

Then("I should be presented with an alert box which contains text {string}", (expectedAlertText) => {
  expect(stub).to.have.been.calledWith(expectedAlertText);
});
