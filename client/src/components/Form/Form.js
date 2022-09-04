import React from 'react';

import { Wrapper } from './Form.styles';
function Form({ children, handleSubmit }) {
	return <Wrapper onSubmit={handleSubmit}>{children}</Wrapper>;
}

export default Form;
