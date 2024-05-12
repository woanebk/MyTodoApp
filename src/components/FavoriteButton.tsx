import { useState, type PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyColors } from '../utils/colors';
import { Icon } from '@rneui/themed';
import { FontSizes } from '../utils/fonts';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

type FavoriteButtonProps = PropsWithChildren<{
    isCheck: boolean;
}>;

const checkedColor = 'rgb(255,255,0)'

function FavoriteButton({ children, isCheck }: FavoriteButtonProps): React.JSX.Element {
    return (
        <TouchableWithoutFeedback >
            <View>
                {isCheck ?
                    <Icon
                        name='star'
                        type='ionicons'
                        color={MyColors.gold}
                        size={FontSizes.extraLarge}
                    />
                    : <Icon name={'star-outline'}
                        type='ionicons' size={FontSizes.extraLarge}
                        color={MyColors.grey} />}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 16,
        height: 16,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: MyColors.grey,
    },
});

export default FavoriteButton;
