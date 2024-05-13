import React, { PropsWithChildren, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { MyColors } from '../utils/colors';

type CheckboxProps = PropsWithChildren<{
    color?: string
  }>;

const Checkbox = ({color = MyColors.blueviolet}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const scaleValue = new Animated.Value(1);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    // Apply the bounce animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 2.0,
        duration: 100,
        useNativeDriver: true, // Add useNativeDriver property
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true, // Add useNativeDriver property
      }),
    ]).start();
  };

  return (
    <TouchableOpacity onPress={handleCheckboxChange}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <View
          style={{
            width: 18,
            height: 18,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: isChecked ? color : 'gray',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isChecked && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                backgroundColor: color,
              }}
            />
          )}
        </View>
      </Animated.View> 
    </TouchableOpacity>
  );
};

export default Checkbox;