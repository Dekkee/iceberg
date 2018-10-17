import { Strategy as LocalStrategy } from 'passport-local';
import { User, UserModel } from '../schemas/User';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { jwtsecret } from './secret';
import { PassportStatic } from 'passport';

export const setup = (passport: PassportStatic) => {
    passport.serializeUser<UserModel, string>(function (user, cb) {
        cb(null, user.email);
    });

    passport.deserializeUser(function (id, cb) {
        User.findById(id, function (err, user) {
            if (err) {
                return cb(err);
            }
            cb(null, user);
        });
    });

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        function (email, password, done) {
            User.findOne({ email }, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user || !user.checkPassword(password)) {
                    return done(null, false, { message: 'Нет такого пользователя или пароль неверен.' });
                }
                return done(null, user);
            });
        }
        )
    );

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtsecret
    };

    passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
        User.findById(payload.id, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        })
    );
};
