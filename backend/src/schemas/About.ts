import { model, Schema, Document } from "mongoose";
import { pbkdf2Sync, randomBytes } from "crypto";

import CrudRepository from './CrudRepository';
import { AboutExtended } from '../../../common/contracts/About';

export interface UserModel extends AboutExtended {
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
            delete ret.passwordHash;
            delete ret.salt;
        }
    }
});

export const About = model<UserModel & Document>('About', aboutSchema);
