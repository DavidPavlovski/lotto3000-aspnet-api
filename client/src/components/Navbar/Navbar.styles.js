import styled from 'styled-components';

export const Navigation = styled.nav`
	display: flex;
	width: 100%;
	height: 70px;
	padding: 10px 40px;
	justify-content: space-between;
	align-items: center;
	background-color: var(--bluePrimary);

	> a {
		font-size: 24px;
		font-weight: 700;
		color: var(--white);
		text-decoration: underline;
	}

	.user-details {
		font-size: 18px;
		color: var(--white);
	}
`;

export const Links = styled.div`
	/* width: 20%; */
	height: 100%;
	gap: 20px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;

	.btn-link {
		display: block;
		padding: 10px 20px;
		background-color: var(--pinkSecondary);
		border-radius: 10px;
		font-size: 18px;
		color: #fff;
		text-decoration: none;
		border: none;
	}
`;
