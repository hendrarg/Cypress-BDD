/// <reference types = "cypress"/>

class base_po {
  //base_Url = "https://www.webdriveruniversity.com"

  navigate(path) {
    cy.fixture("config.json").then((data) => {
      cy.visit(data.baseUrl + path);
    });
  }
  getPageTitle() {
    return cy.title();
  }
}
export default base_po;
