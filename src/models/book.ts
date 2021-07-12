import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
	name: { type: String, required: true },
	pDate: { type: Date, required: true },
	writer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Person',
		required: true,
	},
});

const model = mongoose.models.book || mongoose.model('Book', BookSchema);

export default model;
