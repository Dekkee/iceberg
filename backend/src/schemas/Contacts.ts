import { model, Schema, Document } from "mongoose";

import { ContactsExtended } from '../../../common/contracts/Contacts';

export interface ContactsModel extends ContactsExtended {
    [ index: string ]: any;
}

const contactsSchema = new Schema({
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

export const Contacts = model<ContactsModel & Document>('Contacts', contactsSchema);
