import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'
import GameScreen from '../screens/GameScreen'
import GenreScreen from '../screens/GenreScreen'
import SearchScreen from '../screens/SearchScreen'

const Stack = createNativeStackNavigator()

function ScreenNavigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' options={{ headerShown: false }} component={HomeScreen} />
				<Stack.Screen name='Game' options={{ headerShown: false }} component={GameScreen} />
				<Stack.Screen name='Genre' options={{ headerShown: false }} component={GenreScreen} />
				<Stack.Screen name='Search' options={{ headerShown: false }} component={SearchScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default ScreenNavigation
