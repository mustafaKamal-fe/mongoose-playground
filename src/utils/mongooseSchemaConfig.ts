/**
 *
 * Generates a configuration object that is used as a config object when create
 * a schema object.
 *
 * ## params
 *
 * - `object` config object
 *    - withId `boolean` wether to allow created config object to let mongoose schema create `_id` entry
 *      for the created document.
 *
 * ## returns
 * - config object
 *   - strict `true`
 *   - strictQuery `true`
 *   - autoCreate `boolean`
 *   - autoIndex `boolean`
 */
export default function defaultSchemConfig({
	withId = false,
}: {
	withId: boolean;
}) {
	return {
		_id: withId,
		strict: true,
		strictQuery: true,
		autoCreate: process.env.NODE_env === 'development' ? true : false,
		autoIndex: process.env.NODE_env === 'development' ? true : false,
	};
}
