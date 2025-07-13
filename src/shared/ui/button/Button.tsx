import React, { forwardRef } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import type { StyleProp, ViewStyle, TextStyle } from "react-native";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  onPress?: VoidFunction;
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
  testID?: string;
}

export const Button = forwardRef<any, ButtonProps>(({
  onPress,
  children,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
  fullWidth,
  testID,
}, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      testID={testID}
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  secondary: {
    backgroundColor: "#6c757d",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  fullWidth: {
    width: "100%",
  },
});
