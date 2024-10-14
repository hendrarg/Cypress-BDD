@login @regression
Feature: webdriveeruniversity - login page
    Scenario Outline: Validate valid & invalid login credentials
        # Given I navigate to the webdriveruniversity home page
        Given I navigate to the webdriveruniversity login page
        # When I click on the login portal button
        And I type a username <username>
        And I type a password <password>
        And I click on the login button
        Then I should be presented with an alert box which contains text '<expectedAlertText>'

        Examples:
            | username  | password     | expectedAlertText    |
            | webdriver | webdriver123 | validation succeeded |
            | webdriver | password123  | validation failed    |