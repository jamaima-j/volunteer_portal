const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); //can stop using this because it complicates login

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
  fullName: { type: String },
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  selectedSkills: { type: [String] },
  preferences: { type: String },
  availability: { type: [String] },
  profileComplete: { type: Boolean, default: false },
  matchedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }] //added matched events
});
/* userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});*/

const User = mongoose.model('User', userSchema);
module.exports = User;