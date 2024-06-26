import { memo, type PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MyColors } from '../utils/colors';
import { FontSizes } from '../utils/fonts';
import { Icon } from '@rneui/themed';
import Swipe from './Swipe';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { useGroups } from '../context/GroupProvider';


type GroupCardProps = PropsWithChildren<{
  onDelete?: Function,
  isDefault?: boolean,
  icon?: any,
  group: TodoGroup,
}>;

function GroupCard({ children, onDelete, icon, group, isDefault = true }: GroupCardProps): React.JSX.Element {
  const { deleteGroup } = useGroups();
  const navigation = useAppNavigation();
  const content = () => <TouchableWithoutFeedback onPress={() => {
    navigation.navigate('ListTodo', { group: group })
  }}>
    <View style={styles.container}>
      {icon || <Icon name='list' color={MyColors.blueviolet} />}
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.titleText}>{group.name}</Text>
      </View>
      <Text>{group.todos?.length || ''}</Text>
    </View>
  </TouchableWithoutFeedback>

  return isDefault
    ? <Swipe onDelete={() => {
      deleteGroup(group.id);
    }}>
      {content()}
    </Swipe>
    : content();
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyColors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 0,
  },
  info: {
    flex: 1
  },
  titleText: {
    color: MyColors.black,
    fontSize: FontSizes.medium,
    fontWeight: '500'
  },
});

export default memo(GroupCard);
