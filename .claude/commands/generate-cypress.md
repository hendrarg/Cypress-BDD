# Generate Cypress BDD Test

## Overview
Panduan lengkap membuat test baru di project Cypress BDD dengan Cucumber (JavaScript).

## Project Structure
```
cypress/
├── e2e/                          # Feature files (Gherkin BDD)
│   └── *.feature
├── fixtures/
│   └── config.json               # baseUrl dan data fixture
└── support/
    ├── page_objects/             # Page Object Models
    │   ├── base_po.js            # Base class — navigate() dan getPageTitle()
    │   └── *_po.js               # POM per halaman, extends base_po
    ├── step_definitions/         # Implementasi Given/When/Then
    │   ├── base_steps.js
    │   └── *_steps.js
    └── commands.js               # Custom Cypress commands
```

## To Do List

- [ ] **Analisis test case** — pahami skenario, halaman yang terlibat, data yang dibutuhkan
- [ ] **Buat/update Feature File** (`cypress/e2e/<nama>.feature`)
  - Tulis dalam format Gherkin (Given/When/Then)
  - Tambahkan tag `@<feature> @regression` di atas Feature
  - Gunakan `Scenario Outline` + `Examples` untuk data-driven test
  - Gunakan `Background` untuk precondition yang dipakai semua skenario
- [ ] **Buat/update Page Object** (`cypress/support/page_objects/<nama>_po.js`)
  - Extend `base_po` untuk menggunakan `navigate()`
  - Definisikan locator sebagai property atau dalam objek `element`
  - Tulis method per aksi UI (type, click, validate)
  - Jika POM sudah ada, reuse — jangan duplikasi
  - Prioritas selector: `[name]`/`[id]` > `[type]` > `[data-testid]` > CSS > `cy.xpath()`
- [ ] **Buat/update Step Definitions** (`cypress/support/step_definitions/<nama>_steps.js`)
  - Import `{ Given, When, Then }` dari `@badeball/cypress-cucumber-preprocessor`
  - Instansiasi POM di atas (`const page = new Page_PO()`)
  - Gunakan parameter `{string}`, `{int}`, `{word}` untuk data dinamis di step
  - Jika step sudah ada di file lain, jangan duplikasi
- [ ] **Buat API method jika test butuh precondition API**
  - Jika ada curl → buat method `cy.request()` (lihat `/generate-api`)
  - Jika tidak ada curl → gunakan API method yang sudah ada
  - Jika tidak butuh API → lanjut ke langkah berikutnya
- [ ] **Jalankan test** untuk verifikasi semua skenario pass

## Pola yang Digunakan di Project Ini

### Feature File
```gherkin
@<tag> @regression
Feature: WebdriverUniversity - <nama halaman>

    Background: Pre condition
        Given I navigate to the webdriveruniversity <halaman> page

    Scenario: <deskripsi skenario>
        When I <aksi>
        Then I should <ekspektasi>

    Scenario Outline: <deskripsi data-driven>
        When I type a <field1> and a '<field2>'
        Then I should be presented with '<result>'

        Examples:
            | field1 | field2 | result |
            | value1 | value2 | pass   |
```

### Page Object
```javascript
/// <reference types = "cypress"/>
import base_po from "./base_po";

class nama_halaman_po extends base_po {
  element = {
    fieldName: () => cy.get('[selector]'),
  };

  navigateTo_namaHalaman_page() {
    super.navigate("/Path/ke/halaman.html");
  }

  type_fieldName(value) {
    cy.get('[selector]').type(value);
  }

  clickOn_button() {
    cy.get('[selector]').click();
  }

  validate_result(expectedText) {
    cy.get('[selector]').should('contain.text', expectedText);
  }
}
export default nama_halaman_po;
```

### Step Definitions
```javascript
/// <reference types = "cypress"/>
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import nama_halaman_po from "../page_objects/nama_halaman_po";

const page = new nama_halaman_po();

Given("I navigate to the webdriveruniversity {word} page", (halaman) => {
  page.navigateTo_namaHalaman_page();
});

When("I type a {string}", (value) => {
  page.type_fieldName(value);
});

Then("I should be presented with {string}", (expectedText) => {
  page.validate_result(expectedText);
});
```
