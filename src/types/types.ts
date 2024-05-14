type TodoGroup = {
    id: string;
    name: string; 
    todos: Todo[];
    mainColor?: string
}

type Todo = { 
  id: string;
  name: string;
  descr?: string;
  isFavorite?: boolean;
  done?: boolean
}