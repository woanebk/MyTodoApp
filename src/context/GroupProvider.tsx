import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { GROUP_STORAGE_KEY } from '../utils/constants';

const GroupContext = createContext<{
groups: TodoGroup[],
setGroups:  (g: TodoGroup[]) => void,
getGroups: () => void,
saveGroupsData: () => void,
createNewGroup: (g : TodoGroup) => TodoGroup,
deleteGroup: (id: string) => void,
createTodo: (newTodo: Todo, groupId : string) => void,
deleteTodo: (todoId: string) => void,
updateTodo: (todo: Todo) => void,
updateGroup: (g: TodoGroup) => void,
getGroupById: (id: string) => TodoGroup | undefined
}>({
  groups: [],
  setGroups: (g) => {},
  getGroups: () => {},
  saveGroupsData: () => {},
  createNewGroup: (g) => {return {id:'',name:'', todos: []}},
  deleteGroup: (id) => {},
  createTodo: (newTodo , groupId ) => {},
  deleteTodo: (todoId) => {},
  updateTodo: (todo) => {},
  updateGroup: (g) => {}, 
  getGroupById: (id) => {return {id:'',name:'', todos: []}},
});

type GroupProviderProps = PropsWithChildren<{ 
}>;

const GroupProvider = ({ children }: GroupProviderProps) => {
  const [groups, setGroups] = useState<TodoGroup[]>([]); 
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    saveGroupsData()
  }, [groups, forceUpdate])

  const getGroups = async () => {
   try {
    const result = await AsyncStorage.getItem(GROUP_STORAGE_KEY);
    if (result !== null) setGroups(JSON.parse(result));
   } catch (e) {
    console.log('Error getGroups: ', e)
   }
  };

  const saveGroupsData = async () => {
    try{
      await AsyncStorage.setItem(GROUP_STORAGE_KEY, JSON.stringify(groups));
    }
     catch (e) {
      console.log('Error saveGroupsData: ', e) 
     }
  }

  const getGroupById = (id : string) => {
    return groups.find(e => e.id === id)
  }

  const createNewGroup = (g : TodoGroup) => {
    setGroups([...[g] ,...groups]) 
    return g;
  }

  const deleteGroup = (id: string) => {
    setGroups(groups => groups.filter(e => e.id !== id)) 
  }

  const updateGroup = (g: TodoGroup) => { 
    var targetGroup = groups.find(e => e.id === g.id)
    if (targetGroup) {
      const updateIndex = groups.indexOf(targetGroup)
      groups.splice(updateIndex, 1, g)
      setGroups(groups)
      setForceUpdate(e => !e)
    }
  }

  const createTodo = (newTodo: Todo, groupId : string) => {
    var targetGroup = groups.filter(e => e.id === groupId)
      if (targetGroup.length > 0) {
        targetGroup[0].todos.push(newTodo)
      }
      setGroups(groups)
      setForceUpdate(e => !e)
  }

  const deleteTodo = (todoId: string) => {
    var targetGroup = groups.filter(g => g.todos.some(t => t.id === todoId))
       if (targetGroup.length > 0) {
        const deleteIndex = targetGroup[0].todos.findIndex(e => e.id === todoId)
        targetGroup[0].todos.splice(deleteIndex, 1) 
        setGroups(groups)
        setForceUpdate(e => !e)
       }
  }

  const updateTodo = (todo: Todo) => {
    var targetGroup = groups.filter(g => g.todos.some(t => t.id === todo.id))
       if (targetGroup.length > 0) {
        const updateIndex = targetGroup[0].todos.findIndex(e => e.id === todo.id)
        targetGroup[0].todos.splice(updateIndex, 1, todo) 
        setGroups(groups)
        setForceUpdate(e => !e)
       }
  }

  return (
    <GroupContext.Provider value={{groups, setGroups, getGroups, getGroupById, saveGroupsData, createNewGroup, deleteGroup, updateGroup, createTodo, deleteTodo, updateTodo}}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);

export default GroupProvider;