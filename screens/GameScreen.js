import React, { useState, useRef, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Alert,
	FlatList,
	Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
}

const renderListItem = (ListLength, itemData) => (
	<View style={styles.listItem}>
		<Text>#{ListLength - itemData.index}</Text>
		<Text>{itemData.item}</Text>
	</View>
);

const GameScreen = props => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice)
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(_ => {
		const updateLayout = _ => (
			setAvailableDeviceHeight(Dimensions.get('window').width) &&
			setAvailableDeviceWidth(Dimensions.get('window').height)
		);

		Dimensions.addEventListener('change', updateLayout);
		return _ => Dimensions.removeEventListener('change', updateLayout)
	})

	useEffect(_ => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver])

	const nextGuessHandler = direction => {
		if ((direction === 'lower' && currentGuess < props.userChoice) ||
			(direction === 'greater' && currentGuess > props.userChoice)) {
			Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setPastGuesses(currentPastGuesses => [nextNumber.toString(), ...currentPastGuesses]);
		// setRounds(curRounds => curRounds + 1);
	};

	const listContainerStyle = availableDeviceWidth < 350 ?
		styles.listContainerBig : styles.listContainer;

	if (Dimensions.get('window').height < 500) {
		return (
			<View style={styles.screen}>
				<BodyText>Opponent's Guess</BodyText>
				<View style={styles.controls}>
					<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
						<Ionicons name="md-remove" size={24} color='white' />
					</MainButton>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
						<Ionicons name="md-add" size={24} color='white' />
					</MainButton>
				</View>
				<View style={styles.listContainer}>
					<FlatList
						contentContainerStyle={styles.list}
						keyExtractor={e => e}
						data={pastGuesses}
						renderItem={renderListItem.bind(this, pastGuesses.length)} />
				</View>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name="md-remove" size={24} color='white' />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name="md-add" size={24} color='white' />
				</MainButton>
			</Card>
			<View style={listContainerStyle}>
				<FlatList
					contentContainerStyle={styles.list}
					keyExtractor={e => e}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
		width: 400,
		maxWidth: '90%'
	},
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '80%',
		alignItems: 'center'
	},
	listContainer: {
		flex: 1,
		width: '60%'
	},
	listContainerBig: {
		flex: 1,
		width: '80%'
	},
	list: {
		flexGrow: 1,
		justifyContent: 'flex-end'
	},
	listItem: {
		borderColor: '#ccc',
		borderWidth: 3,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	}
});

export default GameScreen;