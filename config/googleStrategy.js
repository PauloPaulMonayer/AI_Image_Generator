const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel"); // המודל של המשתמשים

// הגדרת Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // בדוק אם המשתמש כבר קיים בבסיס הנתונים
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // צור משתמש חדש אם הוא לא קיים
          user = await User.create({
            googleId: profile.id,
            fullname: profile.displayName || "Google User", // משתמש בשם ברירת מחדל אם אין שם
            email: profile.emails[0].value,
          });
        }

        done(null, user);
      } catch (error) {
        console.error("Error in Google Strategy:", error);
        done(error, null);
      }
    }
  )
);

// סדרת פעולות ל-serialize/deserialize של המשתמשים
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
