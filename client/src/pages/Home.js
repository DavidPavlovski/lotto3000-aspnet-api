import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Wrapper, Title, Content } from '../styles/Home.styles';

function Home() {
	const { auth } = useAuth();
	return (
		<Wrapper>
			<Title>LOTTO 3000</Title>
			<Content>
				<h2>Play lottery today for a chance to win a BRAND NEW CAR!</h2>
				<div>
					<Link to={'/sessions'}>See winners of previos lottery sessions.</Link>
					<Link to={'/newLottoTicket'}>Play now!</Link>
				</div>
			</Content>
		</Wrapper>
	);
}

export default Home;
