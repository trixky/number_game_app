import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = props => <Text style={{...stlyes.body, ...props.style}}>{props.children}</Text>

const stlyes = StyleSheet.create({
	body: {
		fontFamily: 'open-sans'
	}
});

export default BodyText;