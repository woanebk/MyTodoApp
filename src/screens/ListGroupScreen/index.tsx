import { StatusBar, StyleSheet, View , Text} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import GroupCard from '../../components/GroupCard'
import { Icon } from '@rneui/themed'
import { MyColors } from '../../utils/colors'
import { ScrollView } from 'react-native-gesture-handler' 
import { FontSizes } from '../../utils/fonts'
import { useAppNavigation } from '../../hooks/useAppNavigation'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useGroups } from '../../context/GroupProvider'

export default function ListGroupScreen({ }) {
  const navigation = useAppNavigation();
  const {groups} = useGroups()

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerShadowVisible: false,
      headerRight: () => (
        <Icon name='search' />
      ),
    }) 
  }, []) 

  const defaultGroups = () => {
    return (
      <View>
        <GroupCard icon={<Icon name='sunny' color={MyColors.orange} type='ionicons' />}
          group={{id: 'all', name: 'All', todos: [], mainColor: MyColors.orange }} isDefault={false}
        />
        <GroupCard icon={<Icon name='star-outline' color={MyColors.red} type='ionicons' />}
          group={{id: 'important', name: 'Important', todos: [], mainColor: MyColors.red }} isDefault={false}
        />
        <GroupCard icon={<Icon name='calendar' style={{ marginLeft: 4 }} size={18} color={MyColors.indianred} type='feather' />}
          group={{id: 'planned', name: 'Planned', todos: [] ,mainColor: MyColors.indianred }} isDefault={false}
        />
        <GroupCard icon={<Icon name='person-outline' color={MyColors.green} type='ionicons' />}
          group={{ id: 'personal', name: 'Personal', todos: [], mainColor: MyColors.green  }} isDefault={false}
        />
      </View>)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent />
      <ScrollView
        style={{ flex: 1 }} 
      >
        {defaultGroups()}
        <View style={styles.divider} />
        {groups?.map((item, index) =>
          <GroupCard key={index.toString()} group={item} />

        )}
      </ScrollView>
      <TouchableOpacity onPress={() => {
        navigation.navigate('ListTodo', { }) 
      }}>
        <View style={styles.actionFooter}>
          <Icon name={'add'} color={MyColors.blueviolet} type='ionicons'/> 
          <Text style={styles.actionFooterText}>New Group</Text>
        </View>
      </TouchableOpacity>
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