import mongoose from 'mongoose';

const ReaderSchema = new mongoose.Schema({
	identity: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
	books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

const model = mongoose.models.person || mongoose.model('Reader', ReaderSchema);

export default model;
