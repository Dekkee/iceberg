import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../schemas/User";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { jwtsecret } from "./secret";
import { PassportStatic } from "passport";

export const setup = (passport: PassportStatic) => {
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
                    return done(err)
                }
                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            })
        })
    );
};
