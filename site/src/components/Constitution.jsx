import React from 'react';
import { Fragment } from 'react';
import { TextBlock } from '../components/TextBlock.jsx';
import { Hx } from '../components/Hx.jsx';
import css from './Constitution.module.less';

export { Constitution };

function Constitution(props) {
	let { preamble, common } = props;

	return (
		<div className={css.page}>
			<div className={css.constitution}>
				<TextBlock>{preamble}</TextBlock>
				<Parts>{common}</Parts>
			</div>
		</div>
	);
}

function Parts(props) {
	let { level, children } = props;

	let parts = children.map((part, index) => {
		let headerNode;
		let contentNode;

		if (part.partName) {
			headerNode = (
				<Hx classes={css} level={level}>
					{part.partName}
				</Hx>
			);
		}

		if (Array.isArray(part.parts)) {
			contentNode = (
				<Parts level={level + 1} key={index}>
					{part.parts}
				</Parts>
			);
		} else {
			contentNode = <TextBlock>{part.content}</TextBlock>;
			if (!part.equalContent) {
				contentNode = (
					<div className={css.clause}>
						<div className={css.clauseContentRow}>
							<div className={css.clauseYear}>1994</div>
							<div className={css.clauseContent}>
								{contentNode}
							</div>
						</div>
						<div className={css.clauseContentRow}>
							<div className={css.clauseYear}>2004</div>
							<div className={css.clauseContent}>
								<TextBlock>{part.newContent}</TextBlock>
							</div>
						</div>
					</div>
				);
			}
		}

		return (
			<Fragment key={index}>
				{headerNode}
				{contentNode}
			</Fragment>
		);
	});

	return <>{parts}</>;
}
Parts.defaultProps = {
	level: 1,
};
