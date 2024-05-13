import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyColors } from '../utils/colors';

type PaperBackgroundProps = PropsWithChildren<{
}>;

function PaperBackground({ children, ...otherProps }: PaperBackgroundProps): React.JSX.Element {
    return (
        <View style={{ flex: 1, overflow: 'hidden' }}>
            <View {...otherProps} style={styles.paperBackground}>
                {Array.from(Array(20).keys()).map((item, index) =>
                    <View key={index} style={styles.divider} />
                )}
            </View>
            <View style={styles.childContainer}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    childContainer: {
        position: 'absolute',
        left: 0, top: 0, right: 0, bottom: 0
    }
});

export default PaperBackground;
