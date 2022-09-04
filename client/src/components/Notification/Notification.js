import React from 'react';
import { Wrapper } from './Notification.styles';

function Notification({ message, type }) {
	return (
		<Wrapper type={type}>
			<h2>{message}</h2>
		</Wrapper>
	);
}

export default Notification;
