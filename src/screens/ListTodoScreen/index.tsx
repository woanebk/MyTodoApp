import { Button, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodoCard from '../../components/TodoCard'
import { FontSizes } from '../../utils/fonts'
import { MyColors } from '../../utils/colors' 

export default function ListTodoScreen() {

  const ListHeader = (title: string, descr: string) => {
    return <View style={{height: 70}}>
      <Text style={{fontSize: FontSizes.extraLarge, fontWeight: 'bold'}}>{title}</Text>
      <Text style={{fontSize: FontSizes.medium}}>{descr}</Text>
    
    </View>
  } 
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent/> 
      <FlatList 
      data={[1,2,3,16]} 
      style={{flex: 1}}
      ListHeaderComponent={() => ListHeader('Today', '12/5/2024')}
      ItemSeparatorComponent={() => <View style={{height:8, flex: 1}}></View>}
      renderItem={({item, index}) => <TodoCard key={index}/>}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingHorizontal: 8
  }, 
})