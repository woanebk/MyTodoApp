import React, { PropsWithChildren, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MyColors } from '../utils/colors';
import { adjustColor } from '../utils/utils';
import { FontSizes } from '../utils/fonts';

type CustomTextInputProps = PropsWithChildren<{
  color?: string
  text?: string,
  onChange?: (text: string) => void,
  onSubmit?: (text: string) => void,
  autoFocus?: boolean,
  hint?: string,
  editable?: boolean,
  onBlur?: () => void
}>;
const CustomTextInput = ({ children, color = MyColors.white, text, onChange, onBlur, autoFocus = false, onSubmit, hint, editable = true }: CustomTextInputProps) => {
  const [isFocused, setIsFocused] = useState(autoFocus);
  const [inputValue, setInputValue] = useState(text || '');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur()
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
    if (onChange) onChange(text)
  };

  return (
    <View style={styles.container}>
      <TextInput
        editable={editable}
        placeholder={hint}
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