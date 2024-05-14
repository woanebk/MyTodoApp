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
import { useGroups } from '../../context/GroupProvider'
import { generateUUID } from '../../utils/utils'
import { useAppNavigation } from '../../hooks/useAppNavigation'
import { RootStackParamList } from '../../navigation/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import CustomHeader from '../../components/CustomHeader'

type TodoDetailsProp = NativeStackScreenProps<RootStackParamList, 'TodoDetails'>

export default function TodoDetailsScreen({ route }: TodoDetailsProp) {
  const navigation = useAppNavigation()
  const { createTodo } = useGroups()

  const params = route.params;

  const [title, setTitle] = useState<string>('')
  const [note, setNote] = useState<string>('')

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const onSubmit = () => {
    const uuid = generateUUID()
    createTodo({
      id: uuid,
      name: title,
      descr: note,
    }, params.groupId)

    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent />
      <CustomHeader
        title={<View style={styles.titleContainer}><Text style={styles.titleText}>asd</Text></View>}
        suffix={
          <TouchableOpacity onPress={onSubmit}>
            <Icon name='check' type='ionicons' />
          </TouchableOpacity>} />
      <View style={{ flex: 1 }}>
        <View style={[styles.row, { alignItems: 'center' }]}>
          <Icon name='circle' type='ionicons' size={FontSizes.medium} />
          <TextInput multiline placeholder='Todo' style={styles.input} autoFocus onChangeText={e => {
            setTitle(e)
          }} />
        </View>

        <View style={[styles.row, { alignItems: 'flex-start' }]}>
          <Icon name='create' type='ionicons' size={FontSizes.medium} style={{ marginTop: 10 }} />
          <TextInput multiline placeholder='Note' style={[styles.input, {
            height: 280,
            textAlignVertical: 'top',
          }]} onChangeText={e => {
            setNote(e)
          }} />
        </View>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 8,
    marginHorizontal: 8
  },
  input: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: MyColors.lightgray
  },

  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: FontSizes.medium,
    color: MyColors.black
  },
})