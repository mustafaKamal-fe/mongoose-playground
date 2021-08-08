import mongoose from 'mongoose';
import defaultSchemConfig from '../../utils/mongooseSchemaConfig';

const UserSchema = new mongoose.Schema(
	{
		name: String,
	},
	defaultSchemConfig({ withId: true })
);
/**
 * See other options like count and justOne and match
 * https://mongoosejs.com/docs/populate.html#populate-virtuals
 */
UserSchema.virtual('posts', {
	ref: 'BlogPost',
	localField: '_id',
	foreignField: 'author',
});

const model = mongoose.models.person || mongoose.model('Author', UserSchema);

export default model;
