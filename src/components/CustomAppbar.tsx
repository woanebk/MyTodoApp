import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native'; 

type CustomAppbarProps = PropsWithChildren<{ 
}>;

function CustomAppbar({ children, }: CustomAppbarProps): React.JSX.Element {
    return (
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});

export default CustomAppbar;
