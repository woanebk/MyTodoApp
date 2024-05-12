import { useEffect, type PropsWithChildren } from 'react';
import { Animated, StyleSheet, Text, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Checkbox from './Checkbox';
import { MyColors } from '../utils/colors';
import { FontSizes } from '../utils/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Icon } from '@rneui/themed';
import { Swipeable } from 'react-native-gesture-handler';

type TodoCardProps = PropsWithChildren<{
  onDelete?: Function
}>;

function TodoCard({ children, onDelete}: TodoCardProps): React.JSX.Element {

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
  ) => {
    
    progress.addListener(value => {  
      if (value > 2) {
        if (onDelete) onDelete()
      }
    })
    
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => {if (onDelete) onDelete()}}>
        <Animated.View style={[styles.rightActionDelete, { opacity }]}>
        <View style={styles.rightActionTextContainer}>
          <View><Text style={styles.rightActionDeleteText}>Delete</Text></View>
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

  return (
    <View style={{borderRadius: 12, backgroundColor: MyColors.red}}>
      <Swipeable 
      renderRightActions={renderRightActions}  

      friction={1.2} 
>
      <View style={styles.container}>
        <Checkbox isCheck />
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.titleText}>asd</Text>
          <Text numberOfLines={1} style={styles.descrText}>asd</Text>
        </View>
        <Icon
          name='star'
          type='font-awesome'
          color='#517fa4'
          size={FontSizes.large}
        />
      </View>
    </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyColors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 8,
  },
  info: {
    flex: 1
  },
  titleText: {
    fontSize: FontSizes.medium
  },
  descrText: {
    fontSize: FontSizes.extraSmall,
    color: MyColors.grey
  },
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
    fontWeight: '500'
  }
});

export default TodoCard;
