import styled from 'styled-components';

export const Wrapper = styled.form`
	width: 50%;
	display: flex;
	gap: 10px;
	flex-direction: column;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid black;

	button {
		height: 40px;
		width: 50%;
		margin: 0 auto;
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 1px;
		color: var(--white);
		background-color: var(--bluePrimary);
		border: none;
		border-radius: 10px;
	}
`;
