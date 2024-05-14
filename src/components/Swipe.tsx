import { useRef, type PropsWithChildren } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { MyColors } from '../utils/colors';
import { Swipeable } from 'react-native-gesture-handler';
import RightAction from './RightAction';
type SwipeProps = PropsWithChildren<{
  onDelete?: Function,
  borderRadius?: number
}>;

function Swipe({ children, onDelete, borderRadius }: SwipeProps): React.JSX.Element {
  const swipeProgress = useRef<number>(0);
  const swipableRef = useRef<Swipeable>(null)

  const showConfirmDialog = () => {
    Alert.alert(
      'Notice',
      'Do you want to delete ?',
      [
        {
          text: 'Yes',
          style: 'default',
          onPress: () => {
            if (onDelete) {
              swipableRef.current?.close()
              onDelete()
            }
          }
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
        ref={swipableRef}
        renderRightActions={(progressValue, dragValue) =>
          <RightAction progress={progressValue}
            dragAnimatedValue={dragValue}
            onProgresValueChange={x => {
              swipeProgress.current = x
            }}
            onPress={showConfirmDialog} />
        }
        friction={1.2}
        onSwipeableWillOpen={(d) => { // xác định khi kéo mà thả tay ra
          if (d == 'right') {
            if (swipeProgress.current > 2) { // nếu kéo vượt quá lề phải độ dài 2 lần nút delete sẽ thực hiện xoá
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

});

export default Swipe;
