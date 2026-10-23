const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kazihub';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Database Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Define Admin Schema & Model
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, default: 'ocholaemmanuelotieno@gmail.com' },
    role: { type: String, default: 'admin' },
    createdAt: { type: Date, default: Date.now }
});
const Admin = mongoose.model('Admin', adminSchema);

// Define Job Schema & Model
const jobSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: String,
    company: String,
    location: String,
    category: String,
    salary: String,
    type: String,
    desc: String
}, { timestamps: true });
const Job = mongoose.model('Job', jobSchema);

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ocholaemmanuelotieno@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'your_app_password_here'
    }
});

function sendEmailToAdmin(subject, htmlContent) {
    transporter.sendMail({
        from: '"KaziHub System" <ocholaemmanuelotieno@gmail.com>',
        to: 'ocholaemmanuelotieno@gmail.com',
        subject: subject,
        html: htmlContent
    }, (error, info) => {
        if (error) console.error('Error sending admin notification:', error);
    });
}

// Token Verification Middleware
function verifyAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. Authorization token missing.' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden. Admin privileges required.' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({ error: 'Invalid or expired authentication token.' });
    }
}

// ================= DATABASE-BACKED LOGIN ROUTE =================
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query database for admin record
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid administrator credentials.' });
        }

        // Verify password hash
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid administrator credentials.' });
        }

        // Issue JWT token
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        return res.json({ token, role: admin.role, message: 'Authentication successful.' });
    } catch (err) {
        console.error('Login database error:', err);
        return res.status(500).json({ error: 'Internal server error during authentication.' });
    }
});

// ================= JOB API ENDPOINTS =================
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ id: 1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve job vacancies.' });
    }
});

app.post('/api/jobs', verifyAdmin, async (req, res) => {
    try {
        const newJob = new Job({ ...req.body, id: Date.now() });
        await newJob.save();

        sendEmailToAdmin(
            `[KaziHub Admin Alert] Vacancy ADDED: ${newJob.title}`,
            `<p>New vacancy posted: <strong>${newJob.title}</strong> at <strong>${newJob.company}</strong>.</p>`
        );

        res.status(201).json(newJob);
    } catch (err) {
        res.status(500).json({ error: 'Failed to post vacancy.' });
    }
});

app.put('/api/jobs/:id', verifyAdmin, async (req, res) => {
    try {
        const updatedJob = await Job.findOneAndUpdate({ id: parseInt(req.params.id) }, req.body, { new: true });
        if (!updatedJob) return res.status(404).json({ error: 'Vacancy not found.' });

        sendEmailToAdmin(
            `[KaziHub Admin Alert] Vacancy MODIFIED: ${updatedJob.title}`,
            `<p>Vacancy updated for <strong>${updatedJob.title}</strong> at <strong>${updatedJob.company}</strong>.</p>`
        );

        res.json({ message: 'Vacancy updated successfully.', job: updatedJob });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update vacancy.' });
    }
});

app.delete('/api/jobs/:id', verifyAdmin, async (req, res) => {
    try {
        const deletedJob = await Job.findOneAndDelete({ id: parseInt(req.params.id) });
        if (!deletedJob) return res.status(404).json({ error: 'Vacancy not found.' });

        sendEmailToAdmin(
            `[KaziHub Admin Alert] Vacancy DELETED`,
            `<p style="color: red;">Vacancy removed: <strong>${deletedJob.title}</strong></p>`
        );

        res.json({ message: 'Vacancy deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete vacancy.' });
    }
});

app.listen(PORT, () => {
    console.log(`KaziHub Kenya API Server running on http://localhost:${PORT}`);
});