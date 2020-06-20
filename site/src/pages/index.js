import React from 'react';
import { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { processRawData } from '../../../src/data/process.js';
import { TextBlock } from '../components/TextBlock.jsx';
import { Hx } from '../components/Hx.jsx';

function IndexPage() {
	return (
		<StaticQuery
			query={graphql`
				{
					belarusConstitution {
						raw
					}
				}
			`}
			render={IndexPageRender}
		/>
	);
}

function IndexPageRender(props) {
	let {
		belarusConstitution: { raw },
	} = props;

	let { preamble, common } = React.useMemo(() => {
		return processRawData(JSON.parse(raw));
	}, [raw]);

	return (
		<div>
			<TextBlock>{preamble}</TextBlock>
			<Parts>{common}</Parts>
		</div>
	);
}

function Parts(props) {
	let { level, children } = props;

	let parts = children.map((part, index) => {
		let headerNode;
		let contentNode;

		if (part.partName) {
			headerNode = <Hx level={level}>{part.partName}</Hx>;
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
					<>
						{contentNode}
						<TextBlock>{part.newContent}</TextBlock>
					</>
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

export default IndexPage;
