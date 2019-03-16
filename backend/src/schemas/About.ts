import { model, Schema, Document } from "mongoose";

import { AboutExtended } from '../../../common/contracts/About';

export interface ContactsModel extends AboutExtended {
    [ index: string ]: any;
}

const aboutSchema = new Schema({
    content: String,
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

export const About = model<ContactsModel & Document>('About', aboutSchema);
