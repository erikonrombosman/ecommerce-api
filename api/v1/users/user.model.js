import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import validator from 'validator';
import crypto from 'crypto-js';
import randomstring from "randomstring";

const UserSchema = mongoose.Schema({
	name: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, validate: {
    validator: (val) => validator.isEmail(val),
    message: 'Valor debe ser un email'
  }},
  salt: {type: String},
}, {
  timestamps: true,
});

UserSchema.index({email: 1}, {unique: 1});
UserSchema.plugin(mongoosePaginate);

// UserSchema.pre('save', (next) => {
//   console.log(this, 'a', next);
//   this.salt = this.makeSalt();
//   this.password = this.encryptPassword(this.password);
//   return next();
// })

UserSchema.methods = {
  async encryptPassword(password) {
    console.log(this);
    if(!this.salt) {
      throw new Error(`Missing password or salt for user ${this.email}`);
    }

    const defaultIterations = 100;
    const defaultKeyLength = 16;
    const salt = this.salt;
    return crypto.PBKDF2(password, salt, {keySize: defaultKeyLength, iterations: defaultIterations});
  },

  makeSalt(byteSize) {
    console.log({hola: 'hola'});
    const defaultByteSize = 16;
    return randomstring.generate(defaultByteSize);
  },

  async authenticate(password) {
    const encryptedPassword = (await this.encryptPassword(password)).toString(crypto.enc.Hex);
    console.log(this.password, encryptedPassword);
    return this.password === encryptedPassword;
  },

  userToken(){
    return {email: this.email, name: this.name, _id: this._id};
  }
}
export default mongoose.model("User", UserSchema);