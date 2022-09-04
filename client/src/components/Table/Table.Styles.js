import styled from 'styled-components';

export const Wrapper = styled.table`
	margin: 0 auto;
	border: 1px solid black;
	border-collapse: collapse;
	width: 50%;
	text-align: center;
	th {
		padding: 10px 30px;
		border: 1px solid black;
	}
	td {
		margin: 0;
		padding: 10px 30px;
		border: 1px solid black;
	}

	tr:nth-child(even) {
		background-color: var(--grey);
	}

	button {
		padding: 5px 20px;
		font-size: 16px;
		border: none;
		background-color: var(--redPrimary);
		color: var(--white);
	}
`;
