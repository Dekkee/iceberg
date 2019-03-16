import { Document, model, Schema } from 'mongoose';
import CrudRepository from './CrudRepository';

import { Stat as StatContract } from '../../../common/contracts/Stat';

export interface StatModel extends StatContract {
    [index: string]: any;
}

const statSchema = new Schema({
    rating: Number,
    player: { type: Schema.Types.ObjectId, ref: 'User' }
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

statSchema.pre('findOne', function (next) {
    this.populate('player');
    next();
});

statSchema.pre('find', function (next) {
    this.populate('player');
    next();
});

export const Stat = model<StatModel & Document>('Stat', statSchema);

export class StatRepository extends CrudRepository<StatModel & Document> {
    constructor () {
        super(Stat);
    }
}
