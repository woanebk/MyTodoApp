import { Keyboard, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MyColors } from '../../utils/colors'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/themed'
import CustomTextInput from '../../components/CustomTextInput'
import { TextInput } from 'react-native-gesture-handler'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { FontSizes } from '../../utils/fonts'

export default function TodoDetailsScreen() {
  const navigation = useNavigation()

  const [title, setTitle] = useState<string>('')
  const [note, setNote] = useState<string>('')

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: MyColors.white
      },
      headerShadowVisible: false,
      headerRight: () => (
        <TouchableOpacity onPress={onSubmit}>
          <Icon name='check' type='ionicons' />
        </TouchableOpacity>
      ),
    })
  }, [])

  const onSubmit = () => {

  }

  return (
    <View style={styles.container}>
      <StatusBar translucent />
      <View style={{ flex: 1 }}> 
         <View style={[styles.row, {alignItems:'center'}]}>
           <Icon name='circle' type='ionicons' size={FontSizes.medium}/>
           <TextInput multiline placeholder='Todo' style={styles.input} onChange={e => setTitle(e.nativeEvent.text)}/>
         </View>
 
         <View style={[styles.row, {alignItems:'flex-start'}]}>
           <Icon name='create' type='ionicons' size={FontSizes.medium} style={{marginTop: 10}}/>
           <TextInput multiline placeholder='Note' style={[styles.input, {height: 280,
         textAlignVertical: 'top',}]}  onChange={e => setNote(e.nativeEvent.text)}/>
         </View>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyColors.white,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal:8,
    marginHorizontal: 8
  },
  input: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: MyColors.lightgray
  }
})