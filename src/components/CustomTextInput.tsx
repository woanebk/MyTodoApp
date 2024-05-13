import React, { PropsWithChildren, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MyColors } from '../utils/colors';
import { adjustColor } from '../utils/utils';
import { FontSizes } from '../utils/fonts'; 

type CustomTextInputProps = PropsWithChildren<{
  color?: string
  text?: string,
  onChange?: (text: string) => void,
  onSubmit?: (text: string) => void,
  autoFocus?: boolean
}>;
const CustomTextInput = ({ children, color = MyColors.white, text, onChange, autoFocus = false, onSubmit }: CustomTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(text || '');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
    if (onChange) onChange(text)
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus={autoFocus}
        style={[styles.text,
        {
          color: color,
          borderRadius: 6,
          paddingVertical: 2,
          textAlignVertical: 'top',
          backgroundColor: isFocused ? adjustColor(color, 50) : 'transparent'
        }]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        value={inputValue}
        onSubmitEditing={e => {
          if (onSubmit) onSubmit(e.nativeEvent.text)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  text: {
    fontSize: FontSizes.extraLarge, fontWeight: 'bold',
  },
  textStyle: {
    backgroundColor: 'transparent'
  },
});

export default CustomTextInput;