import mongoose from 'mongoose';
import defaultSchemConfig from '../../utils/mongooseSchemaConfig';

const BookSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		pDate: { type: Date, required: true },
		writer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Person',
			required: true,
		},
		bookshop: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Bookshop',
			required: true,
		},
	},
	defaultSchemConfig({ withId: true })
);

const model = mongoose.models.book || mongoose.model('Book', BookSchema);

export default model;
