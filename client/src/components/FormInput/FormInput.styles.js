import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
	width: 100%;
	height: 100%;
	input {
		width: 100%;
		height: 40px;
		text-indent: 10px;
		flex-grow: 1;
		font-size: 16px;
	}
	label {
		margin-left: 15px;
	}
`;
