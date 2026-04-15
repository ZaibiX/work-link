import {Strategy as jwtStrategy , ExtractJwt} from 'passport-jwt';
import type { Request } from 'express';
import passport from 'passport';
import { prisma } from '../utils/prisma.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// jwt strategy

var cookieExtractor = function(req: Request) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET!,
}

passport.use(new jwtStrategy(options, async function(jwtPayload:any, next:any){
    try{
        const user = await prisma.user.findUnique({
            where: { email: jwtPayload.email },
        });
        if(user){
            next(null, user);
        }
        else{
            next(null, false);
        }
    }catch(error){
        return next(error, false);
    }
}));

// google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/api/auth/google/callback"
  },
  async function(accessToken: any, refreshToken: any, profile: any, done: any) {
    try {

        
      // Your Google authentication logic here
      const user = await prisma.user.findUnique({
        where: { email: profile.emails[0].value,
            authStrategy:"GOOGLE",

         },
      });
      if (user) {
        return done(null, user);
      } else {
        const newUser = await prisma.user.create({
          data: {
            email: profile.emails[0].value,
            name: profile.displayName,
            authStrategy: "GOOGLE",
            password:"GOOGLE",
          },
        });
        return done(null, newUser);
      }
    } catch (error) {
      return done(error, false);
    }
  }
));


export default passport;