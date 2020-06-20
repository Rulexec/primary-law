import React from 'react';

export { Hx };

function Hx(props) {
	let { level, children } = props;

	switch (level) {
		case 1:
			return <h1>{children}</h1>;
		case 2:
			return <h2>{children}</h2>;
		case 3:
			return <h3>{children}</h3>;
		default:
			return <h4>{children}</h4>;
	}
}
