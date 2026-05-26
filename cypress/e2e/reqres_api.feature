@reqres-api @regression
Feature: Reqres API

  @smoke
  Scenario: Login and receive a token
    When I login via API with email "eve.holt@reqres.in" and password "cityslicka"
    Then the response status code is 200
    And the response body has key "token"

  Scenario: Get list of users
    When I get the list of users via API
    Then the response status code is 200
    And the response body has key "data"

  Scenario: Get a single user by ID
    When I get user 2 via API
    Then the response status code is 200
    And the response user data has first_name "Janet"

  Scenario: Update a user
    When I update user 2 with name "morpheus" and job "zion resident" via API
    Then the response status code is 200
    And the response body has key "updatedAt"

  Scenario: Delete a user
    When I delete user 2 via API
    Then the response status code is 204

  Scenario: Get list of resources
    When I get the list of resources via API
    Then the response status code is 200
    And the response body has key "data"

  Scenario: Get products at page 1
    When I get products at page 1 via API
    Then the response status code is 200
    And the response body has key "data"
