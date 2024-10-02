import { When, Then } from "cypress-cucumber-preprocessor";

When("I visit duckduckgo.com", () => {
  cy.log("Visiting DuckDuckGo");
  cy.visit("https://www.duckduckgo.com");
});

Then("I should see a search bar", () => {
  cy.get("input").should("have.attr", "placeholder", "Search the web without being tracked");
});
