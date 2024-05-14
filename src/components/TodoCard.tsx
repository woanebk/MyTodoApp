import { memo, type PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Checkbox from './Checkbox';
import { MyColors } from '../utils/colors';
import { FontSizes } from '../utils/fonts';
import FavoriteButton from './FavoriteButton';
import Swipe from './Swipe';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { useGroups } from '../context/GroupProvider';

type TodoCardProps = PropsWithChildren<{
  onDelete?: Function,
  todo: Todo,
  groupId: string
}>;

function TodoCard({ children, onDelete, todo, groupId }: TodoCardProps): React.JSX.Element {
  const navigation = useAppNavigation();
  const {deleteTodo} = useGroups()

  return (
    <Swipe onDelete={async () => {
      await deleteTodo(todo.id)
    }} borderRadius={8}>
      <Pressable onPress={() => {
        navigation.navigate('TodoDetails', {todo, groupId})
      }}>
      <View style={styles.container}>
         <Checkbox />
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.titleText}>{todo.name}</Text>
          <Text numberOfLines={1} style={styles.descrText}>{todo.descr}</Text>
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
