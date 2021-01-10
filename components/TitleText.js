import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = props => <Text style={{...stlyes.title, ...props.style}}>{props.children}</Text>

const stlyes = StyleSheet.create({
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 18
	}
});

export default BodyText;