# Yavshok Web Application

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 🚀 Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## 🧪 Testing

### Unit Tests (Jest)
```bash
npm test
```

### E2E Tests (Playwright)

#### Prerequisites
```bash
# Install Playwright browsers
npm run test:e2e:install
```

#### Run Tests
```bash
# All E2E tests
npm run test:e2e

# Tests with UI interface (recommended for development)
npm run test:e2e:ui

# Tests in headed mode (visible browsers)
npm run test:e2e:headed

# Show HTML report
npm run test:e2e:report
```

#### Allure Reports
```bash
# Run tests with Allure
npm run test:e2e:allure

# Generate Allure report
npm run test:e2e:allure:generate

# Open Allure report
npm run test:e2e:allure:open
```

## 📁 Project Structure

```
├── app/                    # Expo Router pages
├── src/
│   ├── features/          # Feature modules
│   │   ├── auth/         # Authentication
│   │   ├── experiments/  # Experiments
│   │   └── user/         # User management
│   ├── layouts/          # Page layouts
│   └── shared/           # Shared components and utilities
│       ├── config/       # Configuration
│       ├── constants/    # Constants
│       ├── lib/          # Utilities
│       ├── testing/      # Testing utilities
│       └── ui/           # UI components
├── tests/                # E2E tests (Playwright)
│   ├── pages/           # Page Object models
│   ├── mocks/           # API mocks
│   └── *.spec.ts        # Test files
├── android/             # Android configuration
├── ios/                 # iOS configuration
└── assets/              # Static assets
```

## 🎯 Features

### Testing
- **Unit tests**: Jest + React Testing Library
- **E2E tests**: Playwright with Page Object pattern
- **API mocks**: Built-in mocks for testing
- **Allure reports**: Detailed reporting

### Cross-platform
- Mobile and desktop support
- Responsive design
- Universal app development

### Architecture
- Feature-based structure
- Shared components
- TypeScript support
- Expo Router for navigation

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [Playwright documentation](https://playwright.dev/): Learn about E2E testing with Playwright.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
