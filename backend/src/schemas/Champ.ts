import { model, Schema, Document } from 'mongoose';

import { Champ as ChampContract } from '../../../common/contracts/Champ';
import CrudRepository from './CrudRepository';

export interface ChampModel extends ChampContract {
    [ index: string ]: any;
}

const champSchema = new Schema({
    title: String,
    description: String,
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

export const Champ = model<ChampModel & Document>('Champ', champSchema);

export class ChampRepository extends CrudRepository<ChampModel & Document> {
    constructor () {
        super(Champ);
    }
}
