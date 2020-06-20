import React from 'react';

export { TextBlock };

function TextBlock({ children }) {
	let paragraphs = children
		.split(/\n{2,}/)
		.map((x) => x.trim())
		.filter((x) => !!x)
		.map((text, index) => {
			text = text.replace(/\n/, ' ');

			return <p key={index}>{text}</p>;
		});

	return <>{paragraphs}</>;
}
