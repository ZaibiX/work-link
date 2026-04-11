import {Strategy as jwtStrategy , ExtractJwt} from 'passport-jwt';
import type { Request } from 'express';
import passport from 'passport';
import { prisma } from '../utils/prisma.js';

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
}))

export default passport;