import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ContactListScreen } from "../screens/ContactListScreen";

const Stack =  createNativeStackNavigator();

export const AppNavigator =() => {
    return(
        <Stack.Navigator initialRouteName="ContactList">
            <Stack.Screen
                name="ContactList"
                component={ContactListScreen}
                options={{title: 'Lista de contactos'}}
            />
        </Stack.Navigator>
    )
}