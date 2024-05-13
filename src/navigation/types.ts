export type RootStackParamList = {
    ListGroup: undefined;
    ListTodo: {  group?: TodoGroup, isCreate?: boolean} | undefined;
    TodoDetails: {mainColor?: string, todo: Todo} | undefined;
  };  