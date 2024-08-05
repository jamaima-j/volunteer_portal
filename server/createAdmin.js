const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const User = require('./models/User'); 
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect('mongodb://127.0.0.1:27017/volunteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  createAdminUser();
}).catch(error => console.error('Could not connect to MongoDB:', error));

async function createAdminUser() {
  try {
    const email = 'admin1@admin.com';
    const password = 'testtest';
    const accountType = 'admin';

    // Check if admin user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      existingUser.password = password; // Update the password to be plain text
      await existingUser.save();
      console.log('Admin user already exists. Password updated.');
      process.exit();
    }

    // Create the admin user
    const adminUser = new User({
      email,
      password, // Store the password as plain text
      accountType,
      fullName: 'Admin',
      profileComplete: true
    });

    await adminUser.save();
    console.log('Admin user created successfully.');
    process.exit();
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

/*mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  createOrUpdateAdminUser();
}).catch(error => console.error('Could not connect to MongoDB:', error));

async function createOrUpdateAdminUser() {
  try {
    const email = 'admin@admin.com';
    const password = '12345678';
    const accountType = 'admin';

    // Check if admin user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Admin user already exists. Updating password.');
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log('Admin user password updated successfully.');
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword);

      // Create the admin user
      const adminUser = new User({
        email,
        password: hashedPassword,
        accountType,
        fullName: 'Admin',
        profileComplete: true
      });

      await adminUser.save();
      console.log('Admin user created successfully.');
    }
    process.exit();
  } catch (error) {
    console.error('Error creating or updating admin user:', error);
    process.exit(1);
  }
}
*/