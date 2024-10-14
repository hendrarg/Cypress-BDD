/// <reference types = "cypress"/>

import base_po from "./base_po";

class contat_us_po extends base_po {
  element = {
    comment_textField: () => cy.get('textarea[name="message"]'),
    submit_button: () => cy.get('[type="submit"]'),
    submision_header_text: () => cy.xpath("//h1 | //body"),
  };
  navigateTo_cantactUs_page() {
    super.navigate("/Contact-Us/contactus.html");
  }
  type_firstName(firstName) {
    cy.get('[name="first_name"]').type(firstName);
  }
  type_lastName(lastName) {
    cy.get('[name="last_name"]').type(lastName);
  }
  type_email(email) {
    cy.get('[name="email"]').type(email);
  }
  type_comment(comment) {
    this.element.comment_textField().type(comment);
  }
  clickOn_submit_button() {
    this.element.submit_button().click();
  }
  validate_submission_header(expectedText) {
    this.element.submision_header_text().contains(expectedText);
    this.element.submision_header_text().invoke("text").should("include", expectedText);
  }
}
export default contat_us_po;
