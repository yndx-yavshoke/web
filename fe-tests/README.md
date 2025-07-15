# Playwright Tests with Allure Reporting

This directory contains automated tests using Playwright with Allure reporting integration.

## Prerequisites

Make sure you have the following installed:
- Node.js (version 16 or higher)
- npm or pnpm

## Installation

Install dependencies:
```bash
npm install
# or
pnpm install
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests in headed mode (with browser UI)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run specific test file
```bash
npx playwright test AuthTest.spec.ts
```

### Run tests with specific pattern
```bash
npx playwright test --grep "login"
```

## Allure Reporting

### Generate Allure Report

After running tests, generate the Allure report:
```bash
npx allure generate allure-results --clean
```

### View Allure Report in Browser

#### Method 1: Open existing report
If you already have a generated report in `allure-report/`:
```bash
npx allure open allure-report
```

#### Method 2: Generate and open report in one command
```bash
npx allure generate allure-results --clean && npx allure open allure-report
```

#### Method 3: Serve report on specific port
```bash
npx allure serve allure-results --port 8080
```

### Complete Workflow

1. **Run tests and generate results:**
   ```bash
   npx playwright test
   ```

2. **Generate and open Allure report:**
   ```bash
   npx allure generate allure-results --clean && npx allure open allure-report
   ```

## Allure Report Features

The Allure report provides:
- **Test Results Overview**: Summary of passed/failed tests
- **Detailed Test Information**: Steps, screenshots, traces
- **Timeline View**: Test execution timeline
- **Categories**: Grouped test failures by type
- **Trends**: Historical test execution data
- **Environment Information**: Test environment details

## Useful Commands

### Clean up reports
```bash
# Remove generated reports
rm -rf allure-report/
rm -rf allure-results/
```

### Run tests with specific configuration
```bash
# Run tests with retries
npx playwright test --retries=2

# Run tests in parallel
npx playwright test --workers=4

# Run tests with specific timeout
npx playwright test --timeout=30000
```

### Export Allure report
```bash
# Export to HTML (already done with generate)
npx allure generate allure-results --clean

# Export to other formats (if supported)
npx allure generate allure-results --report-format json
```

## Troubleshooting

### Allure command not found
If you get "allure command not found", install Allure globally:
```bash
npm install -g allure-commandline
```

### Port already in use
If port 8080 is busy, use a different port:
```bash
npx allure serve allure-results --port 8081
```

### Report not updating
Clear the cache and regenerate:
```bash
rm -rf allure-report/
npx allure generate allure-results --clean
npx allure open allure-report
```

## File Structure

```
tests/
├── allure-results/     # Raw test results for Allure
├── allure-report/      # Generated HTML report
├── tests/              # Test files
│   ├── AuthTest.spec.ts
│   └── LoginTests.spec.ts
├── playwright.config.ts
└── package.json
```

## Configuration

The Playwright configuration includes:
- Allure reporter: `['allure-playwright']`
- Screenshots on failure: `screenshot: 'only-on-failure'`
- Trace collection: `trace: 'on-first-retry'`
- Multiple browser support: Chromium, Firefox, WebKit
