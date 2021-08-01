import mongoose from 'mongoose';
import connectionFactory from './connectionFactory';
import modelFactory from './modelFactory';

interface SchemaBuilder {
	refDbNames: string[];
	refSchemaNames: string[];
	refSchemas: mongoose.Schema[];
	originalSchemaPattern: any;
	pathNames: string[];
}
/**
 *
 * ## Params:
 * - config
 *  ```ts
 *  refDbName:string, // db of external collection we want to refer to and populate
 *	refSchemaName:string, // schema name of of external collection we want to refer to and populate
 *	refSchema:mongoose.Schema, // schema object of of external collection we want to refer to and populate
 *	originalSchemaPattern:any, // schema shape of the collection we are about to build
 *	pathName:string // path name that will refer to the external schema and include populated data
 *  ```
 * ## Returns
 *  - `mongoose.Schema`
 *
 * ### UPDATE:
 * This implementation creates a schema object with as much `ref` paths as needed. Example:
 * ```ts
 * 	// previous implementation in branch cross-db returned schema is like:
 *  {
 *     pathOne: {...},
 *     someRefPath: {type: mongoose.Schema.Types.ObjectId, ref: some-model}
 *  }
 *
 * // This new implementation solves the problem if we want to include SEVERAL ref paths to our model like:
 *
 *  {
 *     pathOne: {...},
 *     refPathOne: {type: mongoose.Schema.Types.ObjectId, ref: some-model},
 *     refPathOne: {type: mongoose.Schema.Types.ObjectId, ref: some-other-model},
 *  }
 * ```
 *
 */
async function dynamicSchemaBuilder(config: SchemaBuilder) {
	const {
		refDbNames,
		refSchemaNames,
		refSchemas,
		originalSchemaPattern,
		pathNames,
	} = config;
	// connect to external model db(s)
	const conns = await Promise.all(
		refDbNames.map(async (refDbName: string) => {
			return await connectionFactory(refDbName);
		})
	);

	if (conns) {
		conns.forEach((conn, i: number) => {
			// build models objects for each connection
			if (conn) {
				const modelName = refSchemaNames[i];

				const schemaName = refSchemas[i];

				const pathName = pathNames[i];

				if (modelName && schemaName && pathName) {
					// build external model from it's schema
					const refModel = modelFactory(conn, modelName, schemaName);
					// attach external model to `ref` path for later population
					originalSchemaPattern[pathName] = [
						{ type: mongoose.Schema.Types.ObjectId, ref: refModel },
					];
				}
			}
		});

		// build final schema that is used in cross-db-ref
		const finalSchema = new mongoose.Schema(originalSchemaPattern);

		// schema returned has `ref` prop = model
		return finalSchema;
	}
}
export default dynamicSchemaBuilder;
