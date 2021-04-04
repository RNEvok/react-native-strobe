import React, { memo, useState, useEffect } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { s } from './AnimatedGradientStyles';
import { GradientHelper } from './GradientHelper';

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

export type AnimatedGradientProps = {
  colorsArray: string[];
  style?: ViewStyle;
  children?: React.ReactNode;
  animationDuration?: number;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colorsArray,
  style,
  children,
  animationDuration
}) => {

  const [prevColors, setPrevColors] = useState(colorsArray);
  const [colors, setColors] = useState(colorsArray);
  const [tweener, setTweener] = useState(new Animated.Value(0));

  if (colorsArray !== colors) {
    // colorsArray has changed since previous render
    setPrevColors(colors);
    setColors(colorsArray);
    setTweener(new Animated.Value(0));
  }

  useEffect(() => {
    Animated.timing(tweener, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: false
    }).start();
  }, [colorsArray]);

  const color1Interp = tweener.interpolate({
    inputRange: [0, 1],
    outputRange: [prevColors[0], colors[0]]
  });

  const color2Interp = tweener.interpolate({
    inputRange: [0, 1],
    outputRange: [prevColors[1], colors[1]]
  });
  
  return (
    <AnimatedGradientHelper
      style={style || s?.component}
      color1={color1Interp}
      color2={color2Interp}
    >
      {children}
    </AnimatedGradientHelper>
  );
};

AnimatedGradient.defaultProps={
  animationDuration: 200
}

const MemorizedComponent = memo(AnimatedGradient);
export { MemorizedComponent as AnimatedGradient };