import Mongoose, { Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const postSchema = new Schema(
  {
    title: String,
    content: String
  },
  {
    timestamps: true
  }
);

postSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true
});

export default Mongoose.model('Post', postSchema);
