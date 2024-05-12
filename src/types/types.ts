type TodoGroup = {
    name: string; 
    todos: Todo[];
}

type Todo = { 
  id: number;
  name: string;
  descr?: string;
  isFavorite?: boolean;
  done?: boolean
}