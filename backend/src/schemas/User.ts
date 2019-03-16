import { model, Schema, Document } from "mongoose";
import { pbkdf2Sync, randomBytes } from "crypto";

import CrudRepository from './CrudRepository';
import { UserExtended } from '../../../common/contracts/User';

export interface UserModel extends UserExtended {
    [ index: string ]: any;

    passwordHash?: string;
    salt?: string;
}

const userSchema = new Schema({
    displayName: String,
    email: {
        type: String,
        required: 'Укажите e-mail',
        unique: 'Такой e-mail уже существует'
    },
    passwordHash: String,
    salt: String,
    isAdmin: {
        type: Boolean,
        default: false,
    }
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

userSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        if (password) {
            this.salt = randomBytes(128).toString('base64');
            this.passwordHash = pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function () {
        return this._plainPassword;
    });

userSchema.methods.checkPassword = function (password: string) {
    if (!password) return false;
    if (!this.passwordHash) return false;
    const hash = pbkdf2Sync(password, this.salt, 1, 128, 'sha1').toString();
    return hash === this.passwordHash;
};

// workaround for virtual password changing
userSchema.pre('update', function (next) {
    const newPassword = this.getUpdate().password;
    if (newPassword) {
        this.findOne({ "_id": this.getUpdate().id }, function (err, doc) {
            doc.password = newPassword;
            doc.save(next);
        });
    } else {
        next();
    }
});

export const User = model<UserModel & Document>('User', userSchema);

export class UserRepository extends CrudRepository<UserModel & Document> {
    constructor () {
        super(User);
    }
}
