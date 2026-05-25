# Cypress BDD — Test Automation Framework

E2E test automation menggunakan **Cypress** + **Cucumber BDD** (JavaScript). Target aplikasi: [WebdriverUniversity](https://www.webdriveruniversity.com/).

---

## Tech Stack

| Tool | Versi | Kegunaan |
|------|-------|----------|
| Cypress | ^13.15.0 | Test runner |
| @badeball/cypress-cucumber-preprocessor | ^21.0.2 | Cucumber BDD integrasi |
| @bahmutov/cypress-esbuild-preprocessor | ^2.2.3 | Bundler untuk feature files |
| multiple-cucumber-html-reporter | ^3.8.0 | HTML report multi-browser |
| cypress-xpath | ^2.0.1 | XPath selector support |

---

## Instalasi

```bash
npm install
```

---

## Menjalankan Test

### Interactive Mode (Cypress Test Runner)
```bash
npm test
```

### Run Semua Feature — Headed Chrome
```bash
npm run full-regression-headed-chrome
```

### Run Semua Feature — Headless Chrome
```bash
npm run full-regression-headless-chrome
```

### Run Berdasarkan Tag
```bash
npm run login-tests-headed         # @login
npm run contact-us-tests-headed    # @contact-us
npm run smoke-pack-headed          # @smoke
npm run regression-pack-headed     # @regression (kecuali @smoke)
npm run login-and-smoke-pack       # @smoke atau @login
```

### Run Satu Feature File
```bash
npx cypress run --headed --browser chrome --spec 'cypress/e2e/login.feature'
```

### Run Berdasarkan Tag Custom
```bash
npx cypress run -e TAGS="@smoke and @regression" --headed
```

---

## Struktur Project

```
cypress-bdd/
├── cypress/
│   ├── e2e/                          # Feature files (Gherkin BDD)
│   │   ├── login.feature
│   │   └── contact_us.feature
│   ├── fixtures/
│   │   └── config.json               # Base URL konfigurasi
│   ├── reports/                      # Output test report
│   │   ├── cucumber-html/
│   │   ├── cucumber-json/
│   │   └── html-multi-report/
│   └── support/
│       ├── page_objects/             # Page Object Models
│       │   ├── base_po.js            # Base class (navigate, getPageTitle)
│       │   ├── homePage_po.js
│       │   ├── login_po.js
│       │   └── contact_us_po.js
│       ├── step_definitions/         # Implementasi Given/When/Then
│       │   ├── base_steps.js         # Hooks global + step generik
│       │   ├── homepage_steps.js
│       │   ├── login_steps.js
│       │   └── contactus_steps.js
│       ├── commands.js               # Custom Cypress commands
│       └── e2e.js                    # Entry point support
├── cypress.config.ts                 # Konfigurasi Cypress + esbuild
├── cucumber-html-reports.js          # Script generate HTML report
└── package.json
```

---

## Arsitektur

### BDD Flow

```
Feature File (.feature)
    ↓  Gherkin step text
Step Definitions (*_steps.js)
    ↓  Panggil method POM
Page Object Models (*_po.js)
    ↓  Interaksi dengan DOM via cy.*
```

### Page Object Pattern

Semua POM extends `base_po.js`. Method `navigate(path)` membaca `baseUrl` dari `cypress/fixtures/config.json`.

```javascript
// Contoh POM
class login_po extends base_po {
  navigateTo_login_page() {
    super.navigate("Login-Portal/index.html");
  }
  type_userName(username) {
    cy.get("#text").type(username);
  }
}
```

### Tags yang Tersedia

| Tag | Keterangan |
|-----|------------|
| `@regression` | Semua test |
| `@login` | Test login page |
| `@contact-us` | Test contact us page |
| `@smoke` | Subset critical test |

---

## Report

### Built-in Cucumber Report
Otomatis di-generate setelah setiap run ke `cypress/reports/cucumber-html/cucumber-report.html`.

### Multi HTML Report
```bash
node cucumber-html-reports.js
```
Output: `cypress/reports/html-multi-report/index.html`

---

## Konvensi

- **File POM**: `<nama>_po.js` — class extends `base_po`, default export
- **File Steps**: `<nama>_steps.js` — import dari `@badeball/cypress-cucumber-preprocessor`
- **Prefix method**: `type_`, `clickOn_`, `navigateTo_`, `validate_`
- **Selector priority**: `[name]` / `[id]` → `[type]` → `[data-testid]` → CSS → `cy.xpath()`
- **Custom commands**: daftarkan di `cypress/support/commands.js`
- Jangan hardcode URL/credentials — gunakan `cypress/fixtures/config.json` atau `Cypress.env()`

---

## Konfigurasi Environment

Edit `cypress/fixtures/config.json` untuk mengganti base URL:
```json
{
  "baseUrl": "https://www.webdriveruniversity.com/"
}
```
