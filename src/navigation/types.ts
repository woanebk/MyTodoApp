export type RootStackParamList = {
    ListGroup: undefined;
    ListTodo: {  group?: TodoGroup} | undefined;
    TodoDetails: {todo?: Todo, groupId: string};
  };  