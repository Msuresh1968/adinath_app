import React, { ReactNode } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  ViewStyle,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import ToastManager from 'toastify-react-native';
import { theme } from './theme';
type BackgroundProps = {
  children: ReactNode;
};

export default function Background({ children }: BackgroundProps) {
  const { colors } = useTheme();

  return (
    <ImageBackground
      // source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={[styles.background, { backgroundColor: colors.background }]}
    >
      <ToastManager useModal={true} />
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  } as ViewStyle,
  container: {
    flex: 1,
    width: '100%',
  } as ViewStyle,
});
