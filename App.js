import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = _ => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});
};

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={_ => setDataLoaded(true)}
				onError={err => console.log(err)}
			/>
		);
	}

	const configureNewGameHandler = _ => {
		setGuessRounds(0);
		setUserNumber(null);
	};

	const startGameHandler = selectedNumber => {
		setUserNumber(selectedNumber);
		setGuessRounds(0);
	};

	const gameOverHandler = numOfRounds => {
		setGuessRounds(numOfRounds)
	};

	const content = (userNumber && guessRounds <= 0) ?
		<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} /> :
		guessRounds > 0 ?
			<GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} /> :
			<StartGameScreen onStartGame={startGameHandler} />;

	return (
		<SafeAreaView style={styles.screen}>
			<Header title="Guess a Number" />
			{content}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1
	}
});
