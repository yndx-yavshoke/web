import { useRef, useEffect, RefObject } from 'react';
import { findNodeHandle, NativeModules, Platform } from 'react-native';

interface UseTestIdOptions {
  testID: string;
  enabled?: boolean;
}

interface UseTestIdsOptions {
  testIDs: string[];
  enabled?: boolean;
}

// Single test ID hook
export const useTestId = ({ testID, enabled = true }: UseTestIdOptions) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    // Skip native module calls on web platform
    if (Platform.OS === 'web' || !enabled || !testID || !ref.current) return;

    const nodeHandle = findNodeHandle(ref.current);
    if (nodeHandle && NativeModules.TestIdModule) {
      NativeModules.TestIdModule.setTestId(nodeHandle, testID)
        .catch((error: any) => {
          if (__DEV__) {
            console.warn('Failed to set test ID:', error);
          }
        });
    }
  }, [testID, enabled]);

  return {
    ref,
    testID: enabled ? testID : undefined,
  };
};

// Multiple test IDs hook for better performance
export const useTestIds = ({ testIDs, enabled = true }: UseTestIdsOptions) => {
  const refs = useRef<RefObject<any>[]>(
    testIDs.map(() => ({ current: null }))
  );

  useEffect(() => {
    // Skip native module calls on web platform
    if (Platform.OS === 'web' || !enabled) return;

    testIDs.forEach((testID, index) => {
      const ref = refs.current[index];
      if (!testID || !ref?.current) return;

      const nodeHandle = findNodeHandle(ref.current);
      if (nodeHandle && NativeModules.TestIdModule) {
        NativeModules.TestIdModule.setTestId(nodeHandle, testID)
          .catch((error: any) => {
            if (__DEV__) {
              console.warn(`Failed to set test ID for ${testID}:`, error);
            }
          });
      }
    });
  }, [testIDs, enabled]);

  return testIDs.map((testID, index) => ({
    ref: refs.current[index],
    testID: enabled ? testID : undefined,
  }));
};

// Utility hook for common form elements
export const useFormTestIds = (formName: string, fields: string[], enabled = true) => {
  const testIDs = fields.map(field => `${formName}_${field}`);
  return useTestIds({ testIDs, enabled });
};

export default useTestId; 