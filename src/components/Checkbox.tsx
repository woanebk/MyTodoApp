import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyColors } from '../utils/colors';

type CheckboxProps = PropsWithChildren<{
    isCheck: boolean;
}>;

function Checkbox({ children, isCheck }: CheckboxProps): React.JSX.Element {
    return (
        <View style={styles.container}>
        </View>
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

export default Checkbox;
