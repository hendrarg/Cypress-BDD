/// <reference types = "cypress"/>
import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import homePage_po from "../page_objects/homePage_po";

const homePage = new homePage_po();

Given("I navigate to the webdriveruniversity home page", () => {
  homePage.navigate("");
});

When("I click on the contact us button", () => {
  homePage.clickOn_contacuUs_button();
});

When("I click on the login portal button", () => {
  homePage.clickOn_login_button();
});
