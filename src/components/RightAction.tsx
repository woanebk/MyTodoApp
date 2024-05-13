import { memo, useEffect, type PropsWithChildren } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { MyColors } from '../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { Icon } from '@rneui/themed';
import { FontSizes } from '../utils/fonts';

type RightActionProps = PropsWithChildren<{
    progress: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
    onPress?: () => void,
    onProgresValueChange?: (value: number) => void
}>;

function RightAction({ progress, dragAnimatedValue, onPress, onProgresValueChange}: RightActionProps): React.JSX.Element {
    const xDistance = 100;
    useEffect(() => {
        var listener = progress.addListener(value => {  
            if (onProgresValueChange) onProgresValueChange(value.value)
          })
        return () => {
            progress.removeListener(listener)  
        }
    }, [progress])  

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
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
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

export default memo(RightAction);
