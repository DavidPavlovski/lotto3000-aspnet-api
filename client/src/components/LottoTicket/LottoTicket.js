import React from 'react';

import LottoBall from '../LottoBall/LottoBall';
import { Wrapper } from './LottoTIcket.styles';

function LottoTicket({ setPickedNumbers, pickedNumbers }) {
	const numbers = [...Array(38).keys()].slice(1);

	return (
		<Wrapper>
			{numbers.map((ball) => (
				<LottoBall
					key={ball}
					number={ball}
					setPickedNumbers={setPickedNumbers}
					pickedNumbers={pickedNumbers}
				></LottoBall>
			))}
		</Wrapper>
	);
}

export default LottoTicket;
