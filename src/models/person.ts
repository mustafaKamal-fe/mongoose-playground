import mongoose from 'mongoose';
import defaultSchemConfig from '../utils/mongooseSchemaConfig';

const PersonSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		age: { type: Date, required: true },
	},
	defaultSchemConfig({ withId: true })
);

const model = mongoose.models.person || mongoose.model('Person', PersonSchema);

export default model;
