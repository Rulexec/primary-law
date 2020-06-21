import React from 'react';
import css from './TextBlock.module.less';

export { TextBlock };

function TextBlock({ children }) {
	// let paragraphs = children
	// 	.split(/\n{2,}/)
	// 	.map((x) => x.trim())
	// 	.filter((x) => !!x)
	// 	.map((text, index) => {
	// 		text = text.replace(/\n/, ' ');

	// 		return <p key={index}>{text}</p>;
	// 	});

	let text = children.replace(/[\s\r\n]+/, ' ');

	let paragraphs = [];
	let lastParagraphSpans = [];

	let regexp = /~\[(.+?)\]~/g;
	let prevOffset = 0;

	while (true) {
		let match = regexp.exec(text);
		if (!match) {
			addPrevText(text.length);
			break;
		}

		addPrevText(match.index);

		let [, diffText] = match;

		addTextWithParagraphsSplit(diffText, css.diffSpan);
		// lastParagraphSpans.push(
		// 	<span key={lastParagraphSpans.length} className={css.diffSpan}>
		// 		{diffText}
		// 	</span>,
		// );

		if (/\.$/.test(diffText)) {
			commitParagraph();
		}

		// 4 — length of `~[]~`
		prevOffset = match.index + diffText.length + 4;
	}

	commitParagraph();

	return <>{paragraphs}</>;

	function addTextWithParagraphsSplit(prevText, className) {
		if (!prevText) {
			return;
		}

		let sentenses = prevText.split('.');

		sentenses.forEach((sentense, index) => {
			if (!sentense) {
				return;
			}

			let text = sentense;

			let isSentenseEnd =
				sentenses.length > 1 && index < sentenses.length - 1;

			if (isSentenseEnd) {
				text += '.';
			}

			lastParagraphSpans.push(
				<span key={lastParagraphSpans.length} className={className}>
					{text}
				</span>,
			);

			if (isSentenseEnd) {
				commitParagraph();
			}
		});
	}
	function addPrevText(toOffset) {
		let prevText = text.slice(prevOffset, toOffset);

		if (prevText) {
			addTextWithParagraphsSplit(prevText);
		}
	}
	function commitParagraph() {
		if (!lastParagraphSpans.length) {
			return;
		}

		paragraphs.push(
			<p key={paragraphs.length} className={css.p}>
				{lastParagraphSpans}
			</p>,
		);
		lastParagraphSpans = [];
	}
}
