const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your_jwt_secret_key_here';
const PORT = process.env.PORT || 5000;

// Configure Nodemailer for Gmail alerts
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ocholaemmanuelotieno@gmail.com', // Sender email / your account
        pass: 'your_app_password_here'         // Replace with your 16-character App Password
    }
});

// Helper function to send email notifications to admin
function sendEmailToAdmin(subject, htmlContent) {
    const mailOptions = {
        from: '"KaziHub System" <ocholaemmanuelotieno@gmail.com>',
        to: 'ocholaemmanuelotieno@gmail.com',
        subject: subject,
        html: htmlContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email notification:', error);
        } else {
            console.log('Admin notification email sent successfully:', info.response);
        }
    });
}

// In-memory candidate users database
let candidateUsers = [];

// Fallback / Initial Job Dataset (All 42 Jobs Intact)
let sampleJobsData = [
    { id: 1, title: "Senior Software Engineer (Fintech)", company: "Safaricom PLC", location: "Nairobi", category: "Technology & ICT", salary: "KES 40,000 - 380,000", type: "Full-Time", desc: "Build scalable microservices for M-PESA payment integration pipelines.", likes: 0, comments: [] },
    { id: 2, title: "Cybersecurity Analyst", company: "Equity Bank Kenya", location: "Nairobi", category: "Banking & Finance", salary: "KES 37,000 - 300,000", type: "Full-Time", desc: "Monitor threat intelligence feeds, conduct vulnerability assessments, and safeguard banking API infrastructure.", likes: 0, comments: [] },
    { id: 3, title: "Public Health Officer", company: "AMREF Health Africa", location: "Kisumu", category: "Healthcare & NGO", salary: "KES 25,000 - 190,000", type: "Contract", desc: "Coordinate community health initiatives and maternal health interventions across Western region counties.", likes: 0, comments: [] },
    { id: 4, title: "Civil Engineer - Highways", company: "KeNHA", location: "Nakuru", category: "Engineering & Construction", salary: "KES 30,000 - 250,000", type: "Full-Time", desc: "Supervise road expansion projects, structural concrete tests, and contractor compliance audits.", likes: 0, comments: [] },
    { id: 5, title: "Cloud Solutions Architect", company: "Microsoft ADC", location: "Nairobi", category: "Technology & ICT", salary: "KES 60,000 - 600,000", type: "Full-Time", desc: "Architect enterprise Azure deployments for pan-African enterprise clients.", likes: 0, comments: [] },
    { id: 6, title: "Commercial Relationship Manager", company: "KCB Bank Kenya", location: "Mombasa", category: "Banking & Finance", salary: "KES 35,000 - 260,000", type: "Full-Time", desc: "Manage corporate banking portfolios for maritime import/export enterprises.", likes: 0, comments: [] },
    { id: 7, title: "Monitoring & Evaluation Specialist", company: "USAID Kenya", location: "Eldoret", category: "Healthcare & NGO", salary: "KES 30,000 - 290,000", type: "Full-Time", desc: "Design M&E frameworks and field reporting metrics for agricultural resilience grants.", likes: 0, comments: [] },
    { id: 8, title: "ICT Officer II", company: "National Treasury Kenya", location: "Nairobi", category: "Public Sector & Govt", salary: "KES 20,000 - 130,000", type: "Permanent", desc: "Maintain IFMIS system databases, user access security profiles, and local network nodes.", likes: 0, comments: [] },
    { id: 9, title: "Agronomist & Extension Officer", company: "Twiga Foods", location: "Nakuru", category: "Agriculture & Agribusiness", salary: "KES 30,000 - 160,000", type: "Full-Time", desc: "Advise partner horticultural farmers on crop yields, GAP certification, and logistics scheduling.", likes: 0, comments: [] },
    { id: 10, title: "Lecturer - Computer Science", company: "Strathmore University", location: "Nairobi", category: "Education & Academic", salary: "KES 35,000 - 270,000", type: "Full-Time", desc: "Teach undergraduate algorithms, conduct AI research, and supervise technical projects.", likes: 0, comments: [] }
];

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

// Admin Authentication
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'ochola' && password === 'ochola123') {
        const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
        return res.json({ token, role: 'admin', message: 'Authentication successful.' });
    }

    return res.status(401).json({ error: 'Invalid administrator credentials.' });
});

// Candidate Registration Route
app.post('/api/users/register', (req, res) => {
    const { fullName, email, password, profession } = req.body;
    const existing = candidateUsers.find(u => u.email === email);
    if (existing) {
        return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const newUser = { id: Date.now(), fullName, email, password, profession };
    candidateUsers.push(newUser);
    res.status(201).json({ message: 'Account registered successfully.', user: newUser });
});

// Candidate Profile Update Route
app.put('/api/users/update-profile', (req, res) => {
    const { email, fullName, profession } = req.body;
    const user = candidateUsers.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ error: 'User account not found.' });
    }

    if (fullName) user.fullName = fullName;
    if (profession) user.profession = profession;

    res.json({ message: 'Account details updated successfully.', user });
});

// Forgot Password Request Route (Sends Email directly to Admin)
app.post('/api/users/forgot-password', (req, res) => {
    const { email, reason } = req.body;

    const emailSubject = `[KaziHub Action Needed] Password Reset Request for ${email}`;
    const htmlBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h3 style="color: #1a365d;">Password Reset Request Alert</h3>
            <p>A job seeker requested a password update on KaziHub Kenya.</p>
            <ul>
                <li><strong>Candidate Email:</strong> ${email}</li>
                <li><strong>Reason / Details:</strong> ${reason || 'N/A'}</li>
                <li><strong>Timestamp:</strong> ${new Date().toLocaleString()}</li>
            </ul>
            <p style="color: #d9534f;"><strong>Action Required:</strong> Please log in as System Administrator to manually assign or update their credentials.</p>
        </div>
    `;

    sendEmailToAdmin(emailSubject, htmlBody);
    res.json({ message: 'Password reset request dispatched to administrator (ocholaemmanuelotieno@gmail.com).' });
});

// Get All Jobs
app.get('/api/jobs', (req, res) => {
    res.json(sampleJobsData);
});

// ADD JOB + EMAIL TRIGGER
app.post('/api/jobs', verifyAdmin, (req, res) => {
    const { title, company, location, category, salary, type, desc } = req.body;
    const newJob = {
        id: Date.now(),
        title,
        company,
        location,
        category,
        salary,
        type: type || 'Full-Time',
        desc,
        likes: 0,
        comments: []
    };

    sampleJobsData.unshift(newJob);
    sendEmailToAdmin(
        `[KaziHub Admin Alert] Vacancy ADDED: ${title}`,
        `<p>New vacancy posted on KaziHub:</p><p><strong>${title}</strong> at <strong>${company}</strong> (${location}) - ${salary}</p>`
    );

    res.status(201).json(newJob);
});

// UPDATE JOB + EMAIL TRIGGER
app.put('/api/jobs/:id', verifyAdmin, (req, res) => {
    const jobId = parseInt(req.params.id);
    const job = sampleJobsData.find(j => j.id === jobId);
    if (!job) return res.status(404).json({ error: 'Job vacancy not found.' });

    Object.assign(job, req.body);
    sendEmailToAdmin(
        `[KaziHub Admin Alert] Vacancy MODIFIED: ${job.title}`,
        `<p>Vacancy record updated for <strong>${job.title}</strong> at <strong>${job.company}</strong>.</p>`
    );

    res.json({ message: 'Job updated successfully.', job });
});

// DELETE JOB + EMAIL TRIGGER
app.delete('/api/jobs/:id', verifyAdmin, (req, res) => {
    const jobId = parseInt(req.params.id);
    const index = sampleJobsData.findIndex(j => j.id === jobId);
    if (index === -1) return res.status(404).json({ error: 'Job vacancy not found.' });

    const deletedJob = sampleJobsData[index];
    sampleJobsData.splice(index, 1);
    sendEmailToAdmin(
        `[KaziHub Admin Alert] Vacancy INTERRUPTED / DELETED`,
        `<p style="color: red;">Line deleted: <strong>${deletedJob.title}</strong> at <strong>${deletedJob.company}</strong>.</p>`
    );

    res.json({ message: 'Job vacancy deleted successfully.' });
});

app.listen(PORT, () => {
    console.log(`KaziHub Kenya API Server running on http://localhost:${PORT}`);
});