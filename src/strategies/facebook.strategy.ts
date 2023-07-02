import { serializeUser } from "passport";

var FacabookStrategy = require( 'passport-facebook' ).Strategy;
const passport = require('passport');
export const {FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_CALLBACK} = process.env;
 

passport.use(new FacabookStrategy({
    clientID:     FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: FACEBOOK_CALLBACK,
    enableProof: true,
    profileFields: ['id', 'emails', 'name'],
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // console.log(profile)
    return done(null,profile);
  }
));

passport.serializeUser((user, callback)=>{
  callback(null,user)
})

passport.deserializeUser((user, callback)=>{
  callback(null,user)
})