/// <reference types = "cypress"/>
import base_po from "./base_po";

class homePage_po extends base_po {
  navigateToHomePage() {
    super.navigate("");
  }
  clickOn_contacuUs_button() {
    cy.clickAndOpenLink_InSameTab("#contact-us");
  }
  clickOn_login_button() {
    cy.clickAndOpenLink_InSameTab("#login-portal");
  }
}
export default homePage_po;
