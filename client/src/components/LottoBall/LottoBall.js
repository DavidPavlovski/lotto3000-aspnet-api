import React, { useState } from 'react';

import { Wrapper } from './LottoBall.styles';

function LottoBall({ number, setPickedNumbers, pickedNumbers }) {
	const [selected, setSelected] = useState(pickedNumbers.includes(number));
	const handleClick = (e) => {
		if (pickedNumbers.some((num) => num === e.target.value)) {
			setPickedNumbers((prev) => prev.filter((num) => num !== e.target.value));
			setSelected(false);
			return;
		}
		if (pickedNumbers.length === 7) return;
		setPickedNumbers((prev) => [...prev, e.target.value]);
		setSelected(true);
	};
	return (
		<Wrapper isSelected={selected} onClick={handleClick} value={number}>
			{number.toString().padStart(2, '0')}
		</Wrapper>
	);
}

export default LottoBall;
