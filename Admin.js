const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kazihub';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB for initial setup...'))
    .catch(err => console.error('Connection error:', err));

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, default: 'ocholaemmanuelotieno@gmail.com' },
    role: { type: String, default: 'admin' },
    createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema);

async function seedAdmin() {
    try {
        const existingAdmin = await Admin.findOne({ username: 'ochola' });
        if (existingAdmin) {
            console.log('Admin account "ochola" already exists in database.');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('ochola123', 10);

        const newAdmin = new Admin({
            username: 'ochola',
            password: hashedPassword,
            email: 'ocholaemmanuelotieno@gmail.com'
        });

        await newAdmin.save();
        console.log('Admin account created successfully in MongoDB database!');
    } catch (error) {
        console.error('Error seeding admin account:', error);
    } finally {
        mongoose.connection.close();
    }
}

seedAdmin();