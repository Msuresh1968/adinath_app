import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';

type ButtonProps = React.ComponentProps<typeof PaperButton> & {
  style?: StyleProp<ViewStyle>;
};

export default function Button({ mode = 'contained', style, icon, ...props }: ButtonProps) {
  const { colors } = useTheme();

  return (
    <PaperButton
      style={[styles.button, { backgroundColor: mode === 'contained' ? colors.primary : 'transparent' }, style]}
      labelStyle={[styles.text, { color: mode === 'contained' ? colors.onPrimary : colors.primary }]}
      mode={mode}
      icon={icon}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    paddingVertical: 0,
    borderRadius: 8,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});
