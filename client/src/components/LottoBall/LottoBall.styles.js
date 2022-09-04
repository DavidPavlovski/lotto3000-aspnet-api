import styled from 'styled-components';

export const Wrapper = styled.button`
	padding: 25px;
	border-radius: 50%;
	border: none;
	background-color: ${({ isSelected }) => (isSelected ? 'var(--yellowPrimary)' : 'var(--grey)')};
`;
