const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your_jwt_secret_key_here';
const PORT = process.env.PORT || 5000;

let sampleJobsData = [
    { id: 1, title: "Senior Software Engineer (Fintech)", company: "Safaricom PLC", location: "Nairobi", category: "Technology & ICT", salary: "KES 280,000 - 380,000", type: "Full-Time", desc: "Build scalable microservices for M-PESA payment integration pipelines.", likes: 0, comments: [] },
    { id: 2, title: "Cybersecurity Analyst", company: "Equity Bank Kenya", location: "Nairobi", category: "Banking & Finance", salary: "KES 220,000 - 300,000", type: "Full-Time", desc: "Monitor threat intelligence feeds, conduct vulnerability assessments, and safeguard banking API infrastructure.", likes: 0, comments: [] },
    { id: 3, title: "Public Health Officer", company: "AMREF Health Africa", location: "Kisumu", category: "Healthcare & NGO", salary: "KES 140,000 - 190,000", type: "Contract", desc: "Coordinate community health initiatives and maternal health interventions across Western region counties.", likes: 0, comments: [] }
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

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'ochola' && password === 'ochola123') {
        const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
        return res.json({ token, role: 'admin', message: 'Authentication successful.' });
    }

    return res.status(401).json({ error: 'Invalid administrator credentials.' });
});

app.get('/api/jobs', (req, res) => {
    res.json(sampleJobsData);
});

app.post('/api/jobs/:id/like', (req, res) => {
    const jobId = parseInt(req.params.id);
    const job = sampleJobsData.find(j => j.id === jobId);
    if (!job) return res.status(404).json({ error: 'Job vacancy not found.' });

    job.likes = (job.likes || 0) + 1;
    res.json({ message: 'Job liked successfully.', likes: job.likes });
});

app.post('/api/jobs/:id/comment', (req, res) => {
    const jobId = parseInt(req.params.id);
    const { comment } = req.body;
    const job = sampleJobsData.find(j => j.id === jobId);
    if (!job) return res.status(404).json({ error: 'Job vacancy not found.' });

    if (!job.comments) job.comments = [];
    job.comments.push(comment);
    res.json({ message: 'Comment added successfully.', comments: job.comments });
});

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
    res.status(201).json(newJob);
});

app.put('/api/jobs/:id', verifyAdmin, (req, res) => {
    const jobId = parseInt(req.params.id);
    const job = sampleJobsData.find(j => j.id === jobId);
    if (!job) return res.status(404).json({ error: 'Job vacancy not found.' });

    Object.assign(job, req.body);
    res.json({ message: 'Job updated successfully.', job });
});

app.delete('/api/jobs/:id', verifyAdmin, (req, res) => {
    const jobId = parseInt(req.params.id);
    const index = sampleJobsData.findIndex(j => j.id === jobId);
    if (index === -1) return res.status(404).json({ error: 'Job vacancy not found.' });

    sampleJobsData.splice(index, 1);
    res.json({ message: 'Job vacancy deleted successfully.' });
});

app.listen(PORT, () => {
    console.log(`KaziHub Kenya API Server running on http://localhost:${PORT}`);
});