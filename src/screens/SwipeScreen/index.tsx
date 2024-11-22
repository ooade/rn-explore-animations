import { useState } from 'react';
import Deck from './Deck';
import { Button, Card, Colors, Text, View } from 'react-native-ui-lib';
import { generateSwipeCardData } from '@/utils';
import { Layout } from '@Components/Layout';

export const SwipeScreen = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [data, setData] = useState(generateSwipeCardData(8));

	const renderNoMoreCards = () => {
		return (
			<View gap-s1 marginH-s5 marginT-s5 center>
				<Text text60 marginV>
					All Done
				</Text>
				<Text text70>There's no more content here!</Text>
				<Button
					backgroundColor={Colors.blue30}
					label="Get more"
					onPress={() => {
						setData(generateSwipeCardData(8));
						setCurrentIndex(0);
					}}
				/>
			</View>
		);
	};

	return (
		<Layout>
			<View margin-s2>
				<Deck
					data={data}
					index={currentIndex}
					renderCard={(card) => (
						<Card absH key={card.id} height={300}>
							<Card.Image source={{ uri: card.imageUri }} height={200} />
							<View paddingH-s2>
								<Text text60 marginT-s3>
									{card.header}
								</Text>
								<Text text80 marginT-s3 ellipsizeMode="tail">
									{card.body}
								</Text>
							</View>
						</Card>
					)}
					setIndex={setCurrentIndex}
					renderNoMoreCards={renderNoMoreCards}
				/>
			</View>
		</Layout>
	);
};
