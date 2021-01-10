import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

const Card = props => {
	return (
		<View style={{...styles.card, ...props.style}}>
			{props.children}
		</View>
	)
};

const styles = StyleSheet.create({
	card: {
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
				elevation: 6
			}
		}),
		borderRadius: 10
	}
})

export default Card;