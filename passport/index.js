const passport = require('passport');
const signupStragegy = require('./signupStrategy');
const signinStragegy = require('./signinStrategy');
const User = require('../model/userRole')
// used to serialize the user for the session
passport.serializeUser(function (email, done) {
    console.log("--------------------")
    console.log(email)
    done(null, email);
    // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function (email, done) {
    User.findOne({
        email: `${email}`
    }).then(async (user, err) => {
        console.log("********")
        console.log(email)
        return done(err, user);
    })
});
passport.use('login', signupStragegy)
passport.use('signin', signinStragegy)
module.exports = passport