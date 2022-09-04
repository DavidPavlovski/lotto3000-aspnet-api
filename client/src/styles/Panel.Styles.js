import styled from 'styled-components';

export const Wrapper = styled.section`
	width: 50%;
	margin: 50px auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 15px;

	a {
		width: 50%;
		padding: 20px 0;
		text-align: center;
		font-size: 24px;
		text-decoration: none;
		color: var(--white);
		background-color: var(--pinkPrimary);
		border: none;
		border-radius: 10px;
	}
`;
