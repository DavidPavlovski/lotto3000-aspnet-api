import styled from 'styled-components';

export const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	gap: 30px;
	width: 50%;
	margin: 50px auto;
	padding: 20px 0;
	background-color: var(--bluePrimary);
	color: var(--white);
	border-radius: 20px;

	h2 {
		font-size: 30px;
	}

	h3.breathe {
		font-size: 24px;
		animation: breathe 1s linear infinite alternate;
	}

	div.options {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
		a {
			margin: 0;
		}
		a,
		button {
			width: 30%;
			padding: 10px;
			font-size: 24px;
		}
		button {
			border: none;
			background-color: var(--pinkSecondary);
			color: var(--white);
			border-radius: 10px;
		}
	}

	a {
		display: block;
		width: 15%;
		margin: 0 auto;
		padding: 10px 30px;
		text-align: center;
		font-size: 24px;
		background-color: var(--pinkSecondary);
		text-decoration: none;
		color: var(--white);
		border-radius: 10px;
	}

	@keyframes breathe {
		from {
			opacity: 1;
		}
		to {
			opacity: 0.5;
		}
	}
`;
