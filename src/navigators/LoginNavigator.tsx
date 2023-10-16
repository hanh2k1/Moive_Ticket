import { View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createNativeStackNavigator();

export default function LoginNavigator(props) {
    return (
        <View style={{flex: 1}}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Login'>
                    {
                        () => <LoginScreen setUser={props.setUser}/>
                    }
                </Stack.Screen>
                <Stack.Screen name='Sign Up' component={SignUpScreen}/>
            </Stack.Navigator>
        </View>
    )
}