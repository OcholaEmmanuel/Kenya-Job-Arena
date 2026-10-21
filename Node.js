const express = require('express');
const nodemailer = require('nodemailer');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(fileUpload());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YOUR_GMAIL_ADDRESS@gmail.com',
        pass: 'YOUR_GMAIL_APP_PASSWORD'
    }
});

app.post('/api/apply', (req, res) => {
    const { name, email, phone, coverText, jobTitle } = req.body;
    const cvFile = req.files ? req.files.cvFile : null;

    const mailOptions = {
        from: email,
        to: 'ocholaemmanuelotieno@gmail.com',
        subject: `New Application for ${jobTitle} from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nCover Letter:\n${coverText}`,
        attachments: cvFile ? [{
            filename: cvFile.name,
            content: cvFile.data
        }] : []
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: error.toString() });
        }
        res.status(200).json({ success: true, message: 'Application sent successfully!' });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));