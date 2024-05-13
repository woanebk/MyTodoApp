import { memo, type PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Checkbox from './Checkbox';
import { MyColors } from '../utils/colors';
import { FontSizes } from '../utils/fonts';
import FavoriteButton from './FavoriteButton';
import Swipe from './Swipe';

type TodoCardProps = PropsWithChildren<{
  onDelete?: Function
}>;

function TodoCard({ children, onDelete }: TodoCardProps): React.JSX.Element {
  return (
    <Swipe onDelete={onDelete} borderRadius={8}>
      <Pressable onPress={() => {}}>
      <View style={styles.container}>
        <Checkbox isCheck />
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.titleText}>asd</Text>
          <Text numberOfLines={1} style={styles.descrText}>asd</Text>
        </View>
        <FavoriteButton isCheck={false} />
      </View>
      </Pressable>
    </Swipe>
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
});

export default memo(TodoCard);
