import { StatusBar, StyleSheet, View , Text} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import GroupCard from '../../components/GroupCard'
import { Icon } from '@rneui/themed'
import { MyColors } from '../../utils/colors'
import { ScrollView } from 'react-native-gesture-handler' 
import { FontSizes } from '../../utils/fonts'

export default function ListGroupScreen({ }) {
  const navigation = useNavigation()
  const [myGroups, setMyGroups] = useState<TodoGroup[]>()

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerShadowVisible: false,
      headerRight: () => (
        <Icon name='search' />
      ),
    })
    getListTodoGroup()
  }, [])

  const getListTodoGroup = async () => {
    setMyGroups([
      {
        name: 'Oke las',
        todos: [
          {
            name: 'asd',
            id: 1
          }
        ]
      },
      {
        name: 'Yoyo',
        todos: []
      },
      {
        name: 'Oke las',
        todos: []
      },
      {
        name: 'Oke las',
        todos: [
          {
            name: 'asd',
            id: 1
          }
        ]
      },
      {
        name: 'Yoyo',
        todos: []
      },
      {
        name: 'Oke las',
        todos: []
      },
    ])
  }

  const defaultGroups = () => {
    return (
      <View>
        <GroupCard icon={<Icon name='sunny' color={MyColors.orange} type='ionicons' />}
          group={{ name: 'All', todos: [] }} isDefault={false}
        />
        <GroupCard icon={<Icon name='star-outline' color={MyColors.red} type='ionicons' />}
          group={{ name: 'Important', todos: [] }} isDefault={false}
        />
        <GroupCard icon={<Icon name='calendar' style={{ marginLeft: 4 }} size={18} color={MyColors.blueviolet} type='feather' />}
          group={{ name: 'Planned', todos: [] }} isDefault={false}
        />
        <GroupCard icon={<Icon name='person-outline' color={MyColors.green} type='ionicons' />}
          group={{ name: 'Personal', todos: [] }} isDefault={false}
        />
      </View>)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          rowGap: 4
        }}
      >
        {defaultGroups()}
        <View style={styles.divider} />
        {myGroups?.map((item, index) =>
          <GroupCard key={index.toString()} group={item} />

        )}
      </ScrollView>
      <View style={styles.actionFooter}>
        <Icon name={'add'} color={MyColors.blueviolet} type='ionicons'/> 
        <Text style={styles.actionFooterText}>New Group</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.white
  },
  divider: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 12,
    backgroundColor: MyColors.lightgrey
  },
  actionFooter: {
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection:'row',
    alignItems: 'center'
  },
  actionFooterText: {
    marginLeft: 12,
    color: MyColors.blueviolet,
    fontSize: FontSizes.medium
  }
})