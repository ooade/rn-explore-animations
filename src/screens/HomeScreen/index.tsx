import { useNavigation } from '@react-navigation/native';
import { Button, Colors, View } from 'react-native-ui-lib';
import { RootStackParamList, ROUTES } from '@/utils';
import { Layout } from '@Components/Layout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const HomeScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	return (
		<Layout>
			<View style={{ paddingHorizontal: 20 }}>
				<Button
					label="Swipe animations"
					backgroundColor={Colors.blue30}
					onPress={() => navigation.navigate(ROUTES.SWIPE)}
				/>
			</View>
		</Layout>
	);
};
