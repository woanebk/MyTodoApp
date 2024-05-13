import { Animated, Button, FlatList, NativeScrollEvent, NativeSyntheticEvent, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodoCard from '../../components/TodoCard'
import { FontSizes } from '../../utils/fonts'
import { MyColors } from '../../utils/colors'
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../components/CustomHeader'
import { adjustColor } from '../../utils/utils'
import { Divider, color } from '@rneui/base'
import { FAB } from '@rneui/themed'
import CustomTextInput from '../../components/CustomTextInput'

const yThreshold = 10;
const fadeTime = 100; //ms

export default function ListTodoScreen() {
  const navigation = useNavigation()
  // Title Fade animation:
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(1)).current;
  var headerAltered = false;
  var currentOffset = 0;

  // colors:
  const mainColor = MyColors.blueviolet
  const subColor = adjustColor(mainColor, 10)
  const bgColor = adjustColor(mainColor, 70)

  const [title, setTitle] = useState<string>('Today')

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

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
      <CustomTextInput color={mainColor} text={title} autoFocus/>
      <Text style={{ fontSize: FontSizes.medium, color: subColor }}>{descr}</Text>
    </Animated.View>
  }

  const paperBackground = () => <View style={styles.paperBackground}>
    {Array.from(Array(20).keys()).map((item, index) =>
      <View key={index} style={styles.divider} />
    )}
  </View>

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <CustomHeader backgroundColor={bgColor} title={<View style={styles.titleContainer}>
        <Animated.Text style={[styles.titleText, {
          opacity: fadeAnim,
          color: mainColor
        }]}>{title}</Animated.Text></View>} />
      <StatusBar translucent />
      <View style={{ flex: 1, overflow: 'hidden' }}>
        {paperBackground()}
        <View style={styles.listContainer}>
          <Animated.FlatList
          onScroll={handleScroll}
          data={[1, 2, 2,3, 2,3, 2,2,2,2,2,2]}
          style={styles.listStyle}
          ListHeaderComponent={() => ListHeader(title, '12/5/2024')}
          ItemSeparatorComponent={() => <View style={{ height: 8, flex: 1 }}></View>}
          renderItem={({ item, index }) => <TodoCard key={index} />}
          />
        </View>
      </View>

      <FAB
        visible={true}
        placement='right'
        icon={{ name: 'add', color: 'white' }}
        color={subColor}
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
    fontSize: FontSizes.large,
    color: MyColors.black
  },
  listContainer: {
    position: 'absolute',
    left: 0, top: 0, right: 0, bottom: 0
  },
  paperBackground: {
    flex: 1,
    paddingTop: 50
  },
  divider: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 12,
    backgroundColor: MyColors.lightgrey,
    marginTop: 50
  },
})