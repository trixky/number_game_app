import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const StartGameScreen = props => {
	const [enteredValue, setEnteredValue] = useState('');
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();
	const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

	const numberInputHandler = inputText => {
		let newValue = inputText.replace(/[^0-9]/g, '');
		if (newValue === '0' || newValue === '00') {
			newValue = ''
		}
		setEnteredValue(newValue);
	};

	const resetInputHandler = () => {
		setEnteredValue('');
		setConfirmed(false);
	};

	useEffect(_ => {
		const updateLayout = _ => setButtonWidth(Dimensions.get('window').width / 4);
		Dimensions.addEventListener('change', updateLayout);
		return _ => Dimensions.removeEventListener('change', updateLayout);
	})

	const confirmInputHandler = _ => {
		const chosenNumber = parseInt(enteredValue);

		if (!isNaN(chosenNumber) &&
			chosenNumber > 0 &&
			chosenNumber <= 99) {
			setConfirmed(true);
			setSelectedNumber(chosenNumber);
			setEnteredValue('');
			Keyboard.dismiss();
		} else {
			Alert.alert('Invalid number!',
				'Number has to be a number between 1 and 99.',
				[{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
		}
	};

	const confirmedOutput = confirmed ?
		<Card style={styles.summaryContainer}>
			<BodyText>You selected</BodyText>
			<NumberContainer>{selectedNumber}</NumberContainer>
			<MainButton
				onPress={props.onStartGame.bind(this, selectedNumber)}>
				START GAME
			</MainButton>
		</Card> :
		null;

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback onPress={_ => Keyboard.dismiss()}>
					<View style={styles.screen}>
						<TitleText style={styles.title}>Start a New Game!</TitleText>
						<Card style={styles.inputContainer}>
							<BodyText style={styles.text}>Select a Number</BodyText>
							<Input
								style={styles.input}
								blurOnSubmit
								autoCapitalize='none'
								autoCorrect={false}
								keyboardType="number-pad"
								maxLength={2}
								onChangeText={numberInputHandler}
								value={enteredValue} />
							<View style={styles.buttonContainer}>
								<View style={{width: buttonWidth}}>
									<Button
										title="Reset"
										color={Colors.accent}
										onPress={resetInputHandler} />
								</View>
								<View style={{width: buttonWidth}}>
									<Button
										title="Confirm"
										color={Colors.primary}
										onPress={confirmInputHandler} />
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	)
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-sans-bold'
	},
	inputContainer: {
		width: '80%',
		minWidth: 300,
		maxWidth: '95%',
		alignItems: 'center',
		padding: 20,
		...Platform.select({
			ios: {
				shadowColor: 'black',
				shadowOpacity: 0.26,
				shadowOffset: { width: 0, height: 2 },
				shadowRadius: 10,
				backgroundColor: 'white',
			},
			android: {
				elevation: 7
			}
		}),
		borderRadius: 10
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
	},
	// button: {
	// 	width: Dimensions.get('window').width / 4,
	// },
	input: {
		width: 50,
		textAlign: 'center'
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: 'center'
	},
	text: {
		fontFamily: 'open-sans'
	}
});

export default StartGameScreen;