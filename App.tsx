import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SwipeScreen } from './src/screens/SwipeScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ROUTES } from './src/utils';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			<Stack.Navigator initialRouteName={ROUTES.HOME}>
				<Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
				<Stack.Screen name={ROUTES.SWIPE} component={SwipeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
