const passport = require('passport');
const PassportJWT = require('passport-jwt')

const JwtStrategy = PassportJWT.Strategy;
const ExtractJwt = PassportJWT.ExtractJwt;
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
    secretOrKey: process.env.SECRET_OR_KEY || 'libralyBookSecret',
}, async (payload, done) => {
    try {
        const userExist = await appman.db.Users.findOne({
            where: {
                id : payload.userId,
            }
        });
        if (!userExist) {
            return done(null, false);
        }
        done(null, userExist); 
    } catch (error) {
        done(error, false); 
    }
}));
