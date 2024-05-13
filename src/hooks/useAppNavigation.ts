import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";

export const useAppNavigation = () => useNavigation<NavigationProp<RootStackParamList>>();