# React Native Testing with R.id for Espresso

This guide explains how to use the custom `useTestId` hook that adds R.id support to React Native components for Android Espresso testing.

## Overview

React Native doesn't natively support Android R.id values, which are required for Espresso testing. This solution provides a native module with React Native hooks that automatically generate and assign R.id values to React Native components, making them testable with Espresso.

## Architecture

The solution consists of:

1. **Native Android Module** (`TestIdModule.kt`) - Provides methods to set R.id values on views
2. **React Native Hooks** (`useTestId.ts`) - Hooks for adding test IDs to components
3. **Platform Detection** - Automatically skips native calls on web platform

## Installation

The native modules are already integrated into your Android app. No additional installation is required.

## Usage

### Method 1: Single Test ID Hook

```tsx
import { useTestId, TestIds } from '../shared/testing';

const MyComponent = () => {
  const loginButton = useTestId({ testID: TestIds.LOGIN_BUTTON });
  
  return (
    <TouchableOpacity
      ref={loginButton.ref}
      testID={loginButton.testID}
      onPress={handleLogin}
    >
      <Text>Login</Text>
    </TouchableOpacity>
  );
};
```

### Method 2: Multiple Test IDs Hook (Recommended for Forms)

```tsx
import { useTestIds, TestIds } from '../shared/testing';

const LoginForm = () => {
  const testElements = useTestIds({
    testIDs: [TestIds.EMAIL_INPUT, TestIds.PASSWORD_INPUT, TestIds.SUBMIT_BUTTON]
  });
  
  const [emailInput, passwordInput, submitButton] = testElements;

  return (
    <View>
      <TextInput
        ref={emailInput.ref}
        testID={emailInput.testID}
        placeholder="Email"
      />
      
      <TextInput
        ref={passwordInput.ref}
        testID={passwordInput.testID}
        placeholder="Password"
        secureTextEntry
      />
      
      <TouchableOpacity
        ref={submitButton.ref}
        testID={submitButton.testID}
        onPress={handleSubmit}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Method 3: Form Test IDs Utility

```tsx
import { useFormTestIds } from '../shared/testing';

const ProfileForm = () => {
  const formElements = useFormTestIds('profile', ['firstName', 'lastName', 'save']);
  const [firstNameInput, lastNameInput, saveButton] = formElements;

  return (
    <View>
      <TextInput
        ref={firstNameInput.ref}
        testID={firstNameInput.testID} // Will be 'profile_firstName'
        placeholder="First Name"
      />
      
      <TextInput
        ref={lastNameInput.ref}
        testID={lastNameInput.testID} // Will be 'profile_lastName'
        placeholder="Last Name"
      />
      
      <TouchableOpacity
        ref={saveButton.ref}
        testID={saveButton.testID} // Will be 'profile_save'
        onPress={handleSave}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## Test ID Conventions

Use the predefined test IDs from `TestIds` constant:

```tsx
import { TestIds, createTestId } from '../shared/testing';

// Predefined IDs
<TouchableOpacity testID={TestIds.LOGIN_BUTTON} />

// Dynamic IDs
<TouchableOpacity testID={createTestId('list_item', index.toString())} />
```

## Available Test IDs

```typescript
export const TestIds = {
  // Authentication
  LOGIN_BUTTON: 'login_button',
  SIGNUP_BUTTON: 'signup_button',
  EMAIL_INPUT: 'email_input',
  PASSWORD_INPUT: 'password_input',
  
  // Navigation
  BACK_BUTTON: 'back_button',
  MENU_BUTTON: 'menu_button',
  HOME_BUTTON: 'home_button',
  
  // Common actions
  SUBMIT_BUTTON: 'submit_button',
  CANCEL_BUTTON: 'cancel_button',
  SAVE_BUTTON: 'save_button',
  
  // And many more...
} as const;
```

## Platform Support

The hooks automatically detect the platform and skip native module calls on web:

```tsx
// This works on all platforms - native calls only happen on Android/iOS
const loginButton = useTestId({ testID: TestIds.LOGIN_BUTTON });
```

## Espresso Testing

Once you've added test IDs to your components, you can use them in Espresso tests:

```kotlin
// In your Espresso test
@Test
fun testLoginFlow() {
    // The test ID "email_input" will be converted to an R.id automatically
    onView(withId(R.id.email_input))
        .perform(typeText("test@example.com"))
    
    onView(withId(R.id.password_input))
        .perform(typeText("password123"))
    
    onView(withId(R.id.login_button))
        .perform(click())
}
```

## How It Works

1. **Test ID Assignment**: When you use the hook, it generates a unique R.id based on the string hash
2. **Consistent IDs**: The same test ID string always generates the same R.id value
3. **Platform Detection**: Native calls are automatically skipped on web platform
4. **React Native testID**: The hook also sets the standard React Native testID prop for cross-platform compatibility

## Best Practices

1. **Use Multiple Test IDs Hook**: For forms with multiple elements, use `useTestIds` for better performance
2. **Descriptive Names**: Choose test IDs that clearly describe the component's purpose
3. **Follow Naming Convention**: Use snake_case for consistency (e.g., `login_button`, `email_input`)
4. **Avoid Dynamic Content**: Don't include dynamic content in test IDs that might change between test runs
5. **Group Related IDs**: Use the `useFormTestIds` utility for related form elements

## Performance Tips

- Use `useTestIds` instead of multiple `useTestId` calls for better performance
- Use `useFormTestIds` for form elements to automatically generate consistent naming
- The hooks are optimized to only make native calls when necessary

## Troubleshooting

### Test ID Not Working
- Ensure you're using both `ref` and `testID` from the hook
- Check that the test ID is not empty or undefined
- Verify the native module is properly registered in `MainApplication.kt`

### Espresso Can't Find Element
- Make sure the view is visible on screen when the test runs
- Check that the test ID matches exactly (case-sensitive)
- Use Android Layout Inspector to verify the R.id is set correctly

### Build Errors
- Clean and rebuild the Android project: `cd android && ./gradlew clean && cd .. && npx expo run:android`
- Ensure all Kotlin files are properly formatted and have correct imports

## Example Implementation

See `src/shared/examples/TestingExample.tsx` for comprehensive examples of all usage patterns.

## Development Mode

You can disable test IDs in production by setting `enabled={false}`:

```tsx
const loginButton = useTestId({ 
  testID: TestIds.LOGIN_BUTTON, 
  enabled: __DEV__ // Only enable in development
});
```

This ensures test IDs are only added during development and testing, not in production builds. 