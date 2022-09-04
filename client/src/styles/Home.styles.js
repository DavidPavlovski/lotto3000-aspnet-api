import styled from 'styled-components';

export const Wrapper = styled.section`
	padding: 0.05px;
	min-height: 100vh;
	background: url('./assets/images/lottery.png');
	background-size: cover;

	ul {
		margin-top: 0;
	}
`;

export const Title = styled.h1`
	margin-top: 20px;
	font-size: 50px;
`;

export const Content = styled.div`
	margin-top: 50px;
	background-color: rgba(0, 0, 0, 0.6);
	padding: 30px;
	color: var(--white);
	div {
		display: flex;
		width: 60%;
		margin: 20px auto;
		align-items: center;
		justify-content: center;
		gap: 20px;
		a {
			width: 50%;
			padding: 20px 30px;
			text-align: center;
			background-color: pink;
			border: none;
			border-radius: 10px;
			background-color: var(--pinkPrimary);
			color: var(--white);
			text-decoration: none;
			font-size: 20px;
			letter-spacing: 2px;
		}
	}
`;
