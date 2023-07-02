import { serializeUser } from "passport";

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');
export const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK} = process.env;
 

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    
    return done(null,profile);
  }
));

passport.serializeUser((user, callback)=>{
  callback(null,user)
})

passport.deserializeUser((user, callback)=>{
  callback(null,user)
})