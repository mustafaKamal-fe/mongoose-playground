import mongoose from 'mongoose';

const WriterSchema = new mongoose.Schema({
	identity: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
	books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

const model = mongoose.models.person || mongoose.model('Writer', WriterSchema);

export default model;
