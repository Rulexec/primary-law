import { getData } from '../src/data/data.js';

export { createSchemaCustomization, createResolvers };

function createSchemaCustomization({ actions }) {
	let { createTypes } = actions;

	const typeDefs = `
		type BelarusConstitution {
			raw: String!
		}`;

	createTypes(typeDefs);
}

function createResolvers({ createResolvers }) {
	createResolvers({
		Query: {
			belarusConstitution: {
				type: 'BelarusConstitution',
				resolve() {
					let data = getData();
					let raw = JSON.stringify(data);

					return {
						raw,
					};
				},
			},
		},
	});
}
