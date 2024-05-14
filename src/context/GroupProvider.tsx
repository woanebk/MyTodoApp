import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { GROUP_STORAGE_KEY } from '../utils/constants';

const GroupContext = createContext<{
groups: TodoGroup[],
setGroups:  (g: TodoGroup[]) => void,
getGroups: () => void,
saveGroupsData: () => void,
createNewGroup: (g : TodoGroup) => void,
deleteGroup: (id: string) => void,
createTodo: (newTodo: Todo, groupId : string) => void,
deleteTodo: (todoId: string) => void
}>({
  groups: [],
  setGroups: (g) => {},
  getGroups: () => {},
  saveGroupsData: () => {},
  createNewGroup: (g) => {},
  deleteGroup: (id) => {},
  createTodo: (newTodo , groupId ) => {},
  deleteTodo: (todoId) => {}
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

  const createNewGroup = async (g : TodoGroup) => {
    try {  
      setGroups([...[g] ,...groups])
    }
     catch (e) {
      console.log('Error createNewGroup: ', e) 
     }
  }

  const deleteGroup = async (id: string) => {
    try {
      setGroups(groups => groups.filter(e => e.id !== id))
    }
     catch (e) {
      console.log('Error deleteGroup: ', e) 
     }
  }

  const createTodo = async (newTodo: Todo, groupId : string) => {
    try { 
      console.log(newTodo)
      var targetGroup = groups.filter(e => e.id === groupId)
      if (targetGroup.length > 0) {
        targetGroup[0].todos.push(newTodo)
      }
      setGroups(groups)
      setForceUpdate(e => !e)
    }
     catch (e) {
      console.log('Error createTodo: ', e) 
     }
  }

  const deleteTodo = async (todoId: string) => {
    try {   
      var targetGroup = groups.filter(g => g.todos.some(t => t.id === todoId))
       if (targetGroup.length > 0) {
        const deleteIndex = targetGroup[0].todos.findIndex(e => e.id === todoId)
        targetGroup[0].todos.splice(deleteIndex, 1) 
        setGroups(groups)
        setForceUpdate(e => !e)
       }
    }
     catch (e) {
      console.log('Error deleteTodo: ', e) 
     }
  }

  return (
    <GroupContext.Provider value={{groups, setGroups, getGroups, saveGroupsData, createNewGroup, deleteGroup, createTodo, deleteTodo}}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);

export default GroupProvider;