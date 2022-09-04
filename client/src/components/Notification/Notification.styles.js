import styled from 'styled-components';

export const Wrapper = styled.div`
	position: absolute;
	background-color: ${({ type }) =>
		type === 'error'
			? 'var(--redPrimary)'
			: type === 'success'
			? 'var(--greenPrimary)'
			: 'grey'}; //<- TODO :change default color
	color: var(--white);
	width: 30%;
	padding: 10px 0;
	border: 3px solid black;
	border-radius: 25px;
	right: 50px;
	top: 80px;
`;
