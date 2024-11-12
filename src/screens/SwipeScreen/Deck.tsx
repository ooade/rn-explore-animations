import { useEffect, useRef } from 'react';
import {
	Animated,
	Dimensions,
	LayoutAnimation,
	PanResponder,
	Platform,
	UIManager,
} from 'react-native';

const animationTimings = {
	short: 250,
};

const Deck = ({
	data,
	index,
	setIndex,
	renderCard,
	onSwipeLeft = () => {},
	onSwipeRight = () => {},
	renderNoMoreCards,
}) => {
	const pan = useRef(new Animated.ValueXY()).current;
	const windowWidth = Dimensions.get('window').width;
	const swipeThreshold = windowWidth * 0.25;

	if (
		Platform.OS === 'android' &&
		UIManager.setLayoutAnimationEnabledExperimental
	) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}

	useEffect(() => {
		if (index !== 0) {
			LayoutAnimation.spring();
		}
	}, [index]);

	const forceReset = () =>
		Animated.spring(pan, {
			toValue: { x: 0, y: 0 },
			useNativeDriver: true,
		}).start();

	const onSwipeComplete = (direction) => {
		direction === 'right' ? onSwipeRight() : onSwipeLeft();
		pan.setValue({ x: 0, y: 0 });
		setIndex((i) => i + 1);
	};

	const forceSwipe = (direction) => {
		const x = direction === 'right' ? windowWidth : -windowWidth;

		Animated.timing(pan, {
			toValue: {
				x,
				y: 0,
			},
			duration: animationTimings.short,
			useNativeDriver: true,
		}).start(() => onSwipeComplete(direction));
	};
	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
				useNativeDriver: false,
			}),
			onPanResponderRelease: (event, gesture) => {
				if (gesture.dx > swipeThreshold) {
					forceSwipe('right');
				} else if (gesture.dx < -swipeThreshold) {
					forceSwipe('left');
				} else {
					forceReset();
				}
			},
		})
	).current;

	if (index >= data.length) {
		return renderNoMoreCards();
	}

	return (
		<>
			{data
				.map((item, i) => {
					if (index > i) return null;

					return (
						<Animated.View
							key={item.id}
							style={{
								transform:
									index === i
										? [
												{ translateX: pan.x },
												{ translateY: pan.y },
												{
													rotate: pan.x.interpolate({
														inputRange: [-windowWidth * 2, 0, windowWidth * 2],
														outputRange: ['-120deg', '0deg', '120deg'],
													}),
												},
										  ]
										: [],
								top: index === i ? 0 : 10 * (i - index),
							}}
							{...panResponder.panHandlers}
						>
							{renderCard(item)}
						</Animated.View>
					);
				})
				.reverse()}
		</>
	);
};

export default Deck;
