import { model, Schema, Document } from 'mongoose';
import CrudRepository from './CrudRepository';

import { News as NewsContract } from '../../../common/contracts/News';

export interface NewsModel extends NewsContract {
    [ index: string ]: any;
}

const newsSchema = new Schema({
    title: String,
    spoiler: String,
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret) {
            delete ret.__v;
        }
    },
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.relatedAt;
            delete ret.updatedAt;
        }
    }
});

newsSchema.pre('findOne', function (next) {
    this.populate('author');
    next();
});

export const News = model<NewsModel & Document>('News', newsSchema);

export class NewsRepository extends CrudRepository<NewsModel & Document> {
    constructor () {
        super(News);
    }
}
