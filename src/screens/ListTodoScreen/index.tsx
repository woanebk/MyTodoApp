import { Animated, NativeScrollEvent, NativeSyntheticEvent, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodoCard from '../../components/TodoCard'
import { FontSizes } from '../../utils/fonts'
import { MyColors } from '../../utils/colors' 
import CustomHeader from '../../components/CustomHeader'
import { adjustColor, generateUUID } from '../../utils/utils' 
import { FAB } from '@rneui/themed'
import CustomTextInput from '../../components/CustomTextInput' 
import PaperBackground from '../../components/PaperBackground' 
import { useAppNavigation } from '../../hooks/useAppNavigation' 
import { RootStackParamList } from '../../navigation/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useGroups } from '../../context/GroupProvider'
import { DEFAULT_GROUP_NAME } from '../../utils/constants'

const yThreshold = 10;
const fadeTime = 100; //ms

type ListTodoProp = NativeStackScreenProps<RootStackParamList, 'ListTodo'>

export default function ListTodoScreen({route}: ListTodoProp) {
  const navigation = useAppNavigation() 
  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-GB');
  
  // Title Fade animation:
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(1)).current;
  var headerAltered = false;
  var currentOffset = 0; 

  // colors:
  const params = route.params;
  const mainColor = params?.group?.mainColor || MyColors.blueviolet
  const subColor = adjustColor(mainColor, 10)
  const bgColor = adjustColor(mainColor, 70)

  const [tempTitle, setTempTitle] = useState<string>(params?.group?.name ?? DEFAULT_GROUP_NAME) /// dùng để reset khi input bị click ra ngoài 
  const {groups, createNewGroup, updateGroup} = useGroups()
  const [forceRender, setForceRender] = useState<boolean>(false)  
  const [id, setId] = useState<string>('')


  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    }) 
  }, [])

  useLayoutEffect(() => {
    if (!params?.group) { // Tạo mới
      var uuid = generateUUID()
      createNewGroup({id: uuid, name: DEFAULT_GROUP_NAME, todos: []})
      setId(uuid)
    } else { // Đã có sẵn
      setId(params.group.id)

      if (!groups.find(e => e.id === params.group?.id)) { // Trường hợp các loại group mặc định
        groups.push(params.group)
      }
    }
  }, []) 

  const groupData = groups.find((e) => e.id === id)  

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const positionY = event.nativeEvent.contentOffset.y;
    let direction = event.nativeEvent.contentOffset.y > currentOffset ? 'down' : 'up';
    currentOffset = event.nativeEvent.contentOffset.y;

    if (positionY > yThreshold && !headerAltered && direction === 'down') {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: fadeTime + 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(titleAnim, {
        toValue: 0,
        duration: fadeTime,
        useNativeDriver: true,
      }).start();
      headerAltered = true;
    }
    
    if (positionY < yThreshold && headerAltered && direction === 'up') {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: fadeTime + 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: fadeTime,
        useNativeDriver: true,
      }).start();
      headerAltered = false;
    }
  }

  const ListHeader = (title: string, descr: string) => {
    return <Animated.View style={{ height: 70, marginTop: 0, opacity: titleAnim }}>
      <CustomTextInput editable={!params?.group?.mainColor} 
        color={mainColor} text={title} autoFocus={false}  
        onSubmit={text => {
          setTempTitle(text)
            updateGroup({...groupData!, ...{name: text}})
        }} 
        onBlur={() => {
          // reset giá trị text khi chưa sửa
          setForceRender(e => !e)
        }}
        />
      <Text style={{ fontSize: FontSizes.medium, color: subColor }}>{descr}</Text>
    </Animated.View>
  } 

  const renderItem = ({item, index}: {item: Todo, index: number}) => {
    return (<TodoCard groupId={params?.group?.id ?? ''} key={index} todo={item} color={groupData?.mainColor}/>)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <CustomHeader backgroundColor={bgColor} title={<View style={styles.titleContainer}>
        <Animated.Text style={[styles.titleText, {
          opacity: fadeAnim,
          color: mainColor
        }]}>{params?.group?.name ?? ''}</Animated.Text></View>} />
      <StatusBar translucent />
      <PaperBackground>
        <Animated.FlatList
          onScroll={handleScroll}
          data={groupData?.todos ?? []}
          style={styles.listStyle}
          ListHeaderComponent={() => ListHeader(tempTitle, formattedToday)}
          ItemSeparatorComponent={() => <View style={{ height: 2, flex: 1 }}></View>}
          renderItem={renderItem}
        />
      </PaperBackground>

      <FAB
        visible={true}
        placement='right'
        icon={{ name: 'add', color: 'white' }}
        color={subColor}
        onPress={ () => {
          navigation.navigate('TodoDetails', {groupId: groupData!.id ?? '' })
        }}
      />  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
    paddingHorizontal: 8
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