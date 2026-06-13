import dotenv from 'dotenv';
import connectDatabase from '../config/database';
import Admin from '../models/Admin';

dotenv.config();

const run = async () => {
  try {
    await connectDatabase();
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error('Please set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
      process.exit(1);
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const admin = new Admin({ email, password });
    await admin.save();
    console.log('Admin user created:', admin.email);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
