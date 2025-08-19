import React, { useState, ReactNode } from 'react';
import {
  StyleSheet,
  Animated,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Card } from 'react-native-paper';
import { theme } from './theme';

type CommonCardProps = {
  title?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  elevation?: any;
};

const CommonCard: React.FC<CommonCardProps> = ({
  title,
  children,
  style,
  onPress,
  titleStyle,
  elevation = 2,
}) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Card style={[styles.card, style]} elevation={elevation}>
          {title ? <Card.Title title={title} titleStyle={[styles.title, titleStyle]} /> : null}
          <Card.Content>{children}</Card.Content>
        </Card>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    width: '100%',
    backgroundColor: theme.colors.background,
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});

export default CommonCard;
