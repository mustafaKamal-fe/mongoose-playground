import mongoose from 'mongoose';
import defaultSchemConfig from '../../utils/mongooseSchemaConfig';

const PostSchema = new mongoose.Schema(
	{
		title: String,
		author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
	},
	defaultSchemConfig({ withId: true })
);

const model = mongoose.models.person || mongoose.model('BlogPost', PostSchema);

export default model;
