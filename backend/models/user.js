import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  mname: { type: String },
  lname: { type: String, required: true },
  studno: { type: String },

  email: { type: String, required: true },
  password: { type: String, required: true },
  
  status: { type: String, required: true },
  usertype: { type: Number, required: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  adviser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


UserSchema.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback);
}

mongoose.model("User", UserSchema);
