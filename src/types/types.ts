type TodoGroup = {
    name: string; 
    todos: Todo[];
    mainColor?: string
}

type Todo = { 
  id: number;
  name: string;
  descr?: string;
  isFavorite?: boolean;
  done?: boolean
}