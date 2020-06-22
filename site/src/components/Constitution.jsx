import React from 'react';
import { Fragment } from 'react';
import GitHubButton from 'react-github-btn';
import { TextBlock } from '../components/TextBlock.jsx';
import { Hx } from '../components/Hx.jsx';
import css from './Constitution.module.less';
import cssText from './TextBlock.module.less';
import { LinkIcon } from './icons/LinkIcon.jsx';
import { Summary } from './Summary.jsx';

export { Constitution };

function Constitution(props) {
	let { preamble, common } = props;

	return (
		<div className={css.page}>
			<div className={css.constitution}>
				<Summary className={css.summary} common={common} />
				<TextBlock>{preamble}</TextBlock>
				<Parts>{common}</Parts>
				<hr className={css.hr} />
				<p className={`${cssText.p} ${css.comment}`}>
					Раздел IV в процессе сравнения, часть статей отсутствует.
					<br />
					Идеи, предложения, обратную связь можно оставить в{' '}
					<a href="https://t.me/joinchat/BO-1IRCOFxcmIj74OM7KvQ">
						телеграм-группе
					</a>
					, там же будет уведомлено о финише сравнения.
				</p>
				<p className={`${cssText.p} ${css.comment}`}>
					Порядок следования глав/статей и отдельных предложений в них
					не соответствовует оригиналу, что сделано для удобства
					сравнения. Ничего кроме порядка следования предложений не
					должно быть изменено.
				</p>
				<p className={`${cssText.p} ${css.comment}`}>
					Первоначальная версия Конституции взята из{' '}
					<a href="https://ru.wikisource.org/wiki/Конституция_Республики_Беларусь/Первоначальная_редакция">
						wikisource
					</a>
					, как и последняя{' '}
					<a href="https://ru.wikisource.org/wiki/Конституция_Республики_Беларусь">
						редакция
					</a>
					. В случае обнаружения расхождений текста с оригиналами,
					просьба сообщить.
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
				<Hx className={css.partHeader} classes={css} level={level}>
					<LinkIcon className={css.headerLink} />
					<span className={css.partName}>{part.partName}</span>
				</Hx>
			);

			if (part.id) {
				headerNode = (
					<a
						id={part.id}
						className={css.partHeaderLink}
						href={`#${part.id}`}
					>
						{headerNode}
					</a>
				);
			}
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
