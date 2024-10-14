/// <reference types = "cypress"/>
import base_po from "./base_po";

class login_po extends base_po {
  navigateTo_login_page() {
    super.navigate("/Login-Portal/index.html");
  }
  type_userName(username) {
    cy.get("#text").type(username);
  }
  type_password(password) {
    cy.get("#password").type(password);
  }
  clickOn_login_button() {
    cy.get("#login-button").click();
  }
}
export default login_po;
