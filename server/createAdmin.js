const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path if needed

mongoose.connect('mongodb://localhost:27017/volunteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  createAdminUser();
}).catch(error => console.error('Could not connect to MongoDB:', error));

async function createAdminUser() {
  try {
    const email = 'admin@admin.com';
    const password = '12345678';
    const accountType = 'admin';

    // Check if admin user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Admin user already exists.');
      process.exit();
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

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
    process.exit();
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}
