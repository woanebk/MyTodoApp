import { memo, type PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MyColors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

type CustomHeaderProps = PropsWithChildren<{
    title?: React.ReactNode,
    suffix?: React.ReactNode,
    backgroundColor?: string 
}>;

function CustomHeader({ children, title, suffix, backgroundColor}: CustomHeaderProps): React.JSX.Element {
    const navigation = useNavigation()
    return (
        <View style={[styles.container, {backgroundColor: backgroundColor || MyColors.white}]}>
            {navigation.canGoBack() && <Pressable 
            onPress={()=> {navigation.goBack()}}>
                <Icon name='arrow-back' type='ionicons' /></Pressable>}
            {title}
            {suffix || <View style={styles.suffixHolder}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 8
    },
    suffixHolder: {
        width: 40, 
        height: '100%', 
    }
});

export default memo(CustomHeader);
