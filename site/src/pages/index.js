import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { processRawData } from '../../../src/data/process.js';
import '../components/global.less';
import '../components/util.module.less';
import { Constitution } from '../components/Constitution.jsx';
import { Helmet } from 'react-helmet';

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
		<>
			<Helmet>
				<title>Сравнение Конституции РБ 1994 и 2004</title>
			</Helmet>
			<Constitution {...{ preamble, common }} />
		</>
	);
}

export default IndexPage;
