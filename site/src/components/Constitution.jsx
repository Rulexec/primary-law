import React from 'react';
import { Fragment } from 'react';
import GitHubButton from 'react-github-btn';
import { TextBlock } from '../components/TextBlock.jsx';
import { Hx } from '../components/Hx.jsx';
import css from './Constitution.module.less';
import cssText from './TextBlock.module.less';

export { Constitution };

function Constitution(props) {
	let { preamble, common } = props;

	return (
		<div className={css.page}>
			<div className={css.constitution}>
				<TextBlock>{preamble}</TextBlock>
				<Parts>{common}</Parts>
				<hr className={css.hr} />
				<p className={`${cssText.p} ${css.comment}`}>
					Разделы III — IX в процессе сравнения.
					<br />
					Идеи, предложения, обратную связь можно оставить в{' '}
					<a href="https://t.me/joinchat/BO-1IRCOFxcmIj74OM7KvQ">
						телеграм-группе
					</a>
					, там же будет уведомлено о дополнениях разделов.
				</p>
				<p className={cssText.p}>
					<GitHubButton
						href="https://github.com/Rulexec/primary-law"
						aria-label="GitHub Rulexec/primary-law repository"
					>
						Rulexec/primary-law
					</GitHubButton>
				</p>
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
