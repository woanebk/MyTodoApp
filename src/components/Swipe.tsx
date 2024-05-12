import { useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import { MyColors } from '../utils/colors';
import { Icon } from '@rneui/themed';
import { FontSizes } from '../utils/fonts';
import { Swipeable } from 'react-native-gesture-handler'; 
type SwipeProps = PropsWithChildren<{
  onDelete?: Function,
  borderRadius?: number
}>;

function Swipe({ children, onDelete, borderRadius }: SwipeProps): React.JSX.Element {
  const swipeProgress = useRef<number>(0); 

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
  ) => {
    const xDistance = 100;
    // useEffect(() => {
    //   return () => {progress.removeAllListeners()}
    // }, [])

    progress.addListener(value => {
      swipeProgress.current = value.value;
    })

    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-xDistance, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    /// animate chữ delete khi kéo quá xa
    const translateX: Animated.AnimatedInterpolation<number> = dragAnimatedValue.interpolate({
      inputRange: [-xDistance * 2, -130],
      outputRange: [-120, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => { 
        showConfirmDialog()
         }}>
        <Animated.View style={[styles.rightActionDelete, { opacity }]}>
          <View style={styles.rightActionTextContainer}>
            <Animated.View style={{ transform: [{ translateX }] }}>
              <Text style={styles.rightActionDeleteText}>Delete</Text>
            </Animated.View>
            <Icon
              name='trash'
              type='font-awesome'
              color={MyColors.white}
              size={FontSizes.large}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const showConfirmDialog = () => {
    Alert.alert(
      'Notice',
      'Do you want to delete ?',
      [
        {
          text: 'Yes',
          style: 'default',
          onPress: () => {if (onDelete) onDelete()}
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );
  }

  return (
    <View style={{ borderRadius: borderRadius || 0, backgroundColor: MyColors.red }}>
      <Swipeable
        renderRightActions={renderRightActions}
        friction={1.2}
        onSwipeableWillOpen={(d) => { // xác định khi kéo mà thả tay ra
          if (d == 'right') {
            if (swipeProgress.current > 3) { // nếu kéo vượt quá lề phải độ dài 3 lần nút delete sẽ thực hiện xoá
              showConfirmDialog()
            }
          }
        }}
      >
        {children}
      </Swipeable>    
    </View>
  );
}

const styles = StyleSheet.create({
  rightActionDelete: {
    backgroundColor: MyColors.red,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  rightActionTextContainer: {
    height: '100%',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  rightActionDeleteText: {
    color: MyColors.white,
    fontSize: FontSizes.small,
    fontWeight: '500',
  }, 
});

export default Swipe;
