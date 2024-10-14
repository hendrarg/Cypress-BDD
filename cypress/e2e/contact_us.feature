@contact-us @regression
Feature: WebdriverUniversity - contact us page

    Background: Pre condition
        Given I navigate to the webdriveruniversity home page
        When I click on the contact us button

    Scenario: Valid Contact Us Submission
        And I type a first name
        And I type a last name
        And I enter email address
        And I enter a comment
        And I click submit button
        Then I should be presented with a successful contact us submission message

    Scenario: Invalid Contact Us Form Submission
        And I type a first name
        And I type a last name
        And I enter a comment
        And I click submit button
        Then I should be presented with a unsuccessful contact us submission message

    Scenario: Valid Contact Us Form Submission - Using specific data
        And I type a first name "Hendra"
        And I type a last name "Rizal"
        And I type a email address "hendra@mail.com"
        And I type a specific word "helo123" and number 6789 within the comment input field
        And I click submit button
        Then I should be presented with a successful contact us submission message

    @smoke
    Scenario Outline: Valid Contact Us Page
        And I type a <firstName> and a '<lastName>'
        And I type a '<email>' and a comment '<comment>'
        And I click submit button
        Then I should be presented with header text '<message>'

        Examples:
            | firstName | lastName | email           | comment           | message                      |
            | Hendra    | Rizal    | hendra@mail.com | Hello how are u?  | Thank You for your Message!  |
            | Rizal     | Gunawan  | harigu@mail.com | Second Scenario   | Thank You for your Message!  |
            | Don       | Roger    | donroger        | Scenario negative | Error: Invalid email address |