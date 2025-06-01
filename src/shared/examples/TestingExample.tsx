import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTestId, useTestIds, useFormTestIds, TestIds, createTestId } from '../testing';

// Example 1: Using single useTestId hook
const SingleTestIdExample = () => {
  const loginButton = useTestId({ testID: TestIds.LOGIN_BUTTON });
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={loginButton.ref}
        testID={loginButton.testID}
        style={styles.button}
        onPress={() => console.log('Login pressed')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Example 2: Using multiple test IDs hook for better performance
const MultipleTestIdsExample = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const testElements = useTestIds({
    testIDs: [TestIds.EMAIL_INPUT, TestIds.PASSWORD_INPUT, TestIds.SUBMIT_BUTTON]
  });

  const [emailInput, passwordInput, submitButton] = testElements;

  return (
    <View style={styles.container}>
      <TextInput
        ref={emailInput.ref}
        testID={emailInput.testID}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      
      <TextInput
        ref={passwordInput.ref}
        testID={passwordInput.testID}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <TouchableOpacity
        ref={submitButton.ref}
        testID={submitButton.testID}
        style={styles.button}
        onPress={() => console.log('Submit pressed')}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

// Example 3: Using form test IDs utility
const FormTestIdsExample = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const formElements = useFormTestIds('profile', ['firstName', 'lastName', 'phone', 'save']);
  const [firstNameInput, lastNameInput, phoneInput, saveButton] = formElements;

  return (
    <View style={styles.container}>
      <TextInput
        ref={firstNameInput.ref}
        testID={firstNameInput.testID}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
        style={styles.input}
      />
      
      <TextInput
        ref={lastNameInput.ref}
        testID={lastNameInput.testID}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
        style={styles.input}
      />
      
      <TextInput
        ref={phoneInput.ref}
        testID={phoneInput.testID}
        placeholder="Phone"
        value={formData.phone}
        onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
        style={styles.input}
      />
      
      <TouchableOpacity
        ref={saveButton.ref}
        testID={saveButton.testID}
        style={styles.button}
        onPress={() => console.log('Save pressed', formData)}
      >
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

// Example 4: Dynamic test IDs for lists
const DynamicTestIdExample = () => {
  const items = ['Apple', 'Banana', 'Orange'];
  
  const listTestIds = useTestIds({
    testIDs: items.map((_, index) => createTestId('fruit_item', index.toString()))
  });

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const testElement = listTestIds[index];
        return (
          <TouchableOpacity
            key={item}
            ref={testElement.ref}
            testID={testElement.testID}
            style={styles.listItem}
            onPress={() => console.log(`Selected ${item}`)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Example 5: Conditional test IDs (disabled on web)
const ConditionalTestIdExample = () => {
  const searchInput = useTestId({ 
    testID: TestIds.SEARCH_INPUT,
    enabled: __DEV__ // Only enable in development
  });
  
  return (
    <View style={styles.container}>
      <TextInput
        ref={searchInput.ref}
        testID={searchInput.testID}
        placeholder="Search..."
        style={styles.input}
      />
    </View>
  );
};

// Main example component
const TestingExample = () => {
  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.title}>Testing Examples with useTestId Hook</Text>
      
      <Text style={styles.subtitle}>1. Single useTestId Hook</Text>
      <SingleTestIdExample />
      
      <Text style={styles.subtitle}>2. Multiple Test IDs Hook</Text>
      <MultipleTestIdsExample />
      
      <Text style={styles.subtitle}>3. Form Test IDs Utility</Text>
      <FormTestIdsExample />
      
      <Text style={styles.subtitle}>4. Dynamic Test IDs</Text>
      <DynamicTestIdExample />
      
      <Text style={styles.subtitle}>5. Conditional Test IDs</Text>
      <ConditionalTestIdExample />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  container: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
    marginVertical: 2,
    borderRadius: 4,
  },
});

export default TestingExample; 