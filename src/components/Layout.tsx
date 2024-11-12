import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>{children}</SafeAreaView>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#fff',
	},
});
