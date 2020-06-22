import React from 'react';
import cn from 'classnames';
import css from './Summary.module.less';

export { Summary };

function Summary(props) {
	let { common, className } = props;

	return (
		<SummaryList
			className={className}
			parts={common}
			level={0}
			maxLevel={1}
		/>
	);
}

function SummaryList(props) {
	let { parts, level, maxLevel, className } = props;

	let lis = parts.map((part) => {
		let nextLevelSummary;

		if (level <= maxLevel - 1) {
			let nextParts =
				part.parts && part.parts.filter((x) => !!x.partName);

			if (nextParts && nextParts.length) {
				nextLevelSummary = (
					<SummaryList
						parts={nextParts}
						level={level + 1}
						maxLevel={maxLevel}
					/>
				);
			}
		}

		return (
			<li key={part.id} className={cn(css.li, level === 0 && css.zeroLevelLi)}>
				<a className={css.link} href={`#${part.id}`}>{part.partName}</a>
				{nextLevelSummary}
			</li>
		);
	});

	return <ul className={cn(css.ul, className)}>{lis}</ul>;
}
