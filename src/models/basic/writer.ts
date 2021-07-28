import mongoose from 'mongoose';
import defaultSchemConfig from '../../utils/mongooseSchemaConfig';

const WriterSchema = new mongoose.Schema(
	{
		identity: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
		books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
	},
	defaultSchemConfig({ withId: true })
);

const model = mongoose.models.person || mongoose.model('Writer', WriterSchema);

export default model;
